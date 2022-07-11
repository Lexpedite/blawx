from django.views import generic
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.core import serializers
from django.http import FileResponse, HttpResponseNotFound, HttpResponseRedirect, HttpResponseNotAllowed
from django.shortcuts import  render, redirect
from django.contrib.auth import login
from django.contrib import messages

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# from rest_framework import permissions

from .serializers import WorkspaceSerializer, CodeUpdateRequestSerializer
from .models import Workspace, DocPage, RuleDocTemplate, RuleDoc, BlawxTest


from cobalt.hierarchical import Act
import lxml
import tempfile

# Create your views here.

def register_request(request):
	if request.method == "POST":
		form = UserCreationForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("blawx:ruledocs")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = UserCreationForm()
	return render (request=request, template_name="registration/register.html", context={"register_form":form})

class RuleDocsView(LoginRequiredMixin, generic.ListView):
    template_name = 'blawx/index.html'
    context_object_name = 'ruledoc_list'

    def get_queryset(self):
        return RuleDoc.objects.filter(owner=self.request.user)
        # return RuleDoc.objects.all()

# class WorkspacesView(generic.ListView):
#     template_name = 'blawx/index.html'
#     context_object_name = 'workspace_list'

#     def get_queryset(self):
#         """
#         Get the Workspaces on the server
#         """
#         return Workspace.objects.all()

class RuleDocView(LoginRequiredMixin, generic.DetailView):
    template_name = 'blawx/ruledoc.html'
    model = RuleDoc

    def get_queryset(self):
        return RuleDoc.objects.filter(pk=self.kwargs['pk'],owner=self.request.user)
      
    # def get_queryset(self):
    #     return RuleDoc.objects.all()

    def get_context_data(self, **kwargs):
        context = super(RuleDocView, self).get_context_data(**kwargs)
        context['tests'] = BlawxTest.objects.filter(ruledoc=RuleDoc.objects.get(pk=self.kwargs['pk']))
        return context

# class WorkspaceView(generic.DetailView):
#     template_name = 'blawx/workspace.html'
#     model = Workspace

#     def get_queryset(self):
#         return Workspace.objects.all()

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def ruleDocLegalTextView(request,pk,section_name):
    ruledoc=RuleDoc.objects.get(owner=request.user,pk=pk)
    cobalt_parse = Act(ruledoc.akoma_ntoso)
    target = cobalt_parse.act.find(".//*[@eId='" + section_name + "']")
    return Response({'xml': lxml.etree.tostring(target),
                     'text': ' '.join(target.itertext())})

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def ruleDocExportView(request,pk):
    download = tempfile.NamedTemporaryFile('w',delete=False,prefix="blawx_rule_" + str(pk) + "_")
    download_filename = download.name
    ruledoc = RuleDoc.objects.filter(owner=request.user,pk=pk)
    download.write(serializers.serialize('yaml',ruledoc))
    sections = Workspace.objects.filter(ruledoc=pk)
    if len(sections):
        download.write(serializers.serialize('yaml',sections))
    tests = BlawxTest.objects.filter(ruledoc=pk)
    if len(tests):
        download.write(serializers.serialize('yaml',tests))
    download.close()
    response = FileResponse(open(download_filename,'rb'),as_attachment=True,filename="blawx_rule_" + str(pk) + ".blawx")
    return response

@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def ruleDocImportView(request):
    if request.method == "POST":

        # The request should include a file.
        upload = request.FILES['loadfile']

        # Deserialize the contents of the file.
        new_objects = serializers.deserialize('yaml',upload.read())

        new_object_list = list(new_objects)
        # Get the RuleDoc, remove the PK, save it, and get the PK of the saved version.
        new_object_list[0].pk = None
        new_object_list[0].owner = request.user
        new_object_list[0].save()
        new_pk = new_object_list[0].pk

        # Use the PK of the saved version to save the workspaces and tests
        for o in new_object_list[1:]:
            o.ruledoc = new_pk
            o.save()
        # Send the user back to root.
        return HttpResponseRedirect('/')
    else:
        return HttpResponseNotAllowed('POST')

class BlawxView(LoginRequiredMixin, generic.DetailView):
    template_name = 'blawx/blawx.html'
    model = RuleDoc

    def get_queryset(self):
        return RuleDoc.objects.filter(owner=self.request.user)
    
    def get_context_data(self, **kwargs):
        context = super(BlawxView, self).get_context_data(**kwargs)
        # context['templates'] = WorkspaceTemplate.objects.all() # TODO I don't think this is being used.
        context['workspaces'] = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(owner=self.request.user,pk=self.kwargs['pk'])) 
        return context

class TestView(LoginRequiredMixin, generic.DetailView):
    template_name = "blawx/test.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(owner=self.request.user,pk=self.kwargs['pk']),test_name=self.kwargs['test_name'])

class BlawxBot(LoginRequiredMixin, generic.DetailView):
    template_name = "blawx/bot.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(owner=self.request.user,pk=self.kwargs['ruledoc']),test_name=self.kwargs['test_name'])

class TestCreateView(LoginRequiredMixin, CreateView):
    model = BlawxTest
    fields = ['test_name']
    # success_url = reverse_lazy('blawx:ruledoc', self.kwargs['pk'])

    def get_success_url(self):
        return reverse_lazy('blawx:ruledoc', args=(self.kwargs['pk'],))
    
    def form_valid(self, form):
        form.instance.ruledoc = RuleDoc.objects.get(owner=self.request.user,pk=self.kwargs['pk'])
        return super().form_valid(form)

class TestDeleteView(LoginRequiredMixin, DeleteView):
    model = BlawxTest

    def get_success_url(self):
        return reverse_lazy('blawx:ruledoc', args=(self.kwargs['pk'],))
    
    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        target = RuleDoc.objects.get(pk=self.kwargs['pk'])
        if target.owner != self.request.user:
            return redirect(self.success_url) # This is sub-optimal.
        return super().post(request, *args, **kwargs)

# class WorkspaceCreateView(CreateView):
#     model = Workspace
#     fields = ['workspace_name']
#     success_url = reverse_lazy('blawx:workspaces')

class RuleDocCreateView(LoginRequiredMixin, CreateView):
    model = RuleDoc
    fields = ['ruledoc_name','rule_text']
    success_url = reverse_lazy('blawx:ruledocs')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)


class RuleDocDeleteView(LoginRequiredMixin, DeleteView):
    model = RuleDoc
    success_url = reverse_lazy('blawx:ruledocs')


    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        if self.object.owner != self.request.user:
            return redirect(self.success_url)
        return super().post(request, *args, **kwargs)


    # def delete(self, request, *args, **kwargs):
    #     target = RuleDoc.objects.get(owner=self.request.user,pk=request.pk)
    #     if target.exists():
    #         target.delete()
    #         return redirect(self.success_url)
    #     else:
    #         return HttpResponseNotFound()

# class WorkspaceDeleteView(DeleteView):
#     model = Workspace
#     success_url = reverse_lazy('blawx:workspaces')

class RuleDocEditView(LoginRequiredMixin, UpdateView):
    model = RuleDoc
    fields = ['ruledoc_name','rule_text']

    def get_success_url(self):
        return reverse_lazy('blawx:ruledoc', args=(self.kwargs['pk'],))

# class WorkspaceUpdateView(UpdateView):
#     model = Workspace
#     fields = ['workspace_name']


class DocumentView(generic.DetailView):
    model = DocPage
    template_name = "blawx/docs.html"

    def get_queryset(self):
        return DocPage.objects.all()


class WorkspaceAPIViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Workspaces to be viewed or edited.
    """
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_code(request,pk,workspace):
    ruledoctest = RuleDoc.objects.get(owner=request.user,pk=pk)
    if ruledoctest:
        target = Workspace.objects.get(ruledoc=pk,workspace_name=workspace)
        workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
        workspace_serializer.is_valid()
        target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
        target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
        target.save()
        return Response({"That probably worked."})
    else:
        return HttpResponseNotFound()

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_code(request,pk,workspace):
    ruledoctest = RuleDoc.objects.get(owner=request.user,pk=pk)
    if ruledoctest:
        (workspace, created) = Workspace.objects.get_or_create(ruledoc=RuleDoc.objects.get(pk=pk),workspace_name=workspace)
        return Response({"xml_content": workspace.xml_content})
    else:
        return HttpResponseNotFound()

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_all_code(request,pk):
    ruledoctest = RuleDoc.objects.get(owner=request.user,pk=pk)
    if ruledoctest:
        workspaces = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=pk))
        output = []
        for w in workspaces:
            output.append({"name": w.workspace_name, "xml_content": w.xml_content})
        return Response(output)
    else:
        return HttpResponseNotFound()

# @api_view(['GET'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])
# def get_example(request,pk):
#     target = RuleDocTemplate.objects.get(pk=pk)
#     return Response({ 'yaml_content': target.yaml_content })

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_test(request,ruledoc,test_name):
    ruledoctest = RuleDoc.objects.get(owner=request.user,pk=ruledoc)
    if ruledoctest:
        target = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
        workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
        workspace_serializer.is_valid()
        target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
        target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
        target.save()
        return Response({"That probably worked."})
    else:
        return HttpResponseNotFound()

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_test(request,ruledoc,test_name):
    ruledoctest = RuleDoc.objects.get(owner=request.user,pk=ruledoc)
    if ruledoctest:
        (test, created) = BlawxTest.objects.get_or_create(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
        return Response({"xml_content": test.xml_content})
    else:
        return HttpResponseNotFound()
from django.views import generic
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
# from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.core import serializers
from django.http import FileResponse, HttpResponse, HttpResponseForbidden, HttpResponseNotFound, HttpResponseRedirect, HttpResponseNotAllowed
from django.shortcuts import  render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib import messages
from django.contrib.auth.models import User

# from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication #, BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from rest_framework import permissions

from guardian.mixins import PermissionRequiredMixin

from .serializers import CodeUpdateRequestSerializer, TestViewUpdateRequestSerializer, SaveFactsRequestSerializer
from .models import Workspace, DocPage, RuleDoc, BlawxTest

from preferences import preferences
from django.conf import settings

from cobalt.hierarchical import Act
import lxml
import tempfile



# Create your views here.


def register_request(request):
    allow_registration = preferences.BlawxPreference.allow_registration 
    if allow_registration:
        if request.method == "POST":
            form = UserCreationForm(request.POST)
            if form.is_valid():
                user = form.save()
                login(request, user, 'django.contrib.auth.backends.ModelBackend')
                messages.success(request, "Registration successful.")
                return redirect("ruledocs")
            messages.error(request, "Unsuccessful registration. Invalid information.")
        if 'X-Forwarded-Email' in request.headers:
            form = UserCreationForm(initial={'username': request.headers['X-Forwarded-Email']})
        else:
            form = UserCreationForm()
        return render (request=request, template_name="registration/register.html", context={"register_form":form})
    else:
        return HttpResponseForbidden()

class RuleDocsView(generic.ListView):
    template_name = 'base2.html'
    context_object_name = 'ruledoc_list'

    def get_queryset(self):
        return RuleDoc.objects.all()
        
class RuleDocView(PermissionRequiredMixin, generic.DetailView):
    permission_required = 'blawx.view_ruledoc'
    template_name = 'blawx/ruledoc.html'
    model = RuleDoc

    def get_object(self, queryset=None):
        user = get_object_or_404(User, username=self.kwargs['user'])
        return get_object_or_404(RuleDoc, rule_slug=self.kwargs['rule'], owner=user)

    def get_queryset(self):
        user = User.objects.get(username=self.kwargs['user'])
        return RuleDoc.objects.filter(rule_slug=self.kwargs['rule'],owner=user)
      
    def get_context_data(self, **kwargs):
        context = super(RuleDocView, self).get_context_data(**kwargs)
        user = User.objects.get(username=self.kwargs['user'])
        context['tests'] = BlawxTest.objects.filter(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=user))
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def ruleDocLegalTextView(request,user,rule,section_name):
    ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user)
    if request.user.has_perm('blawx.view_ruledoc',ruledoc):
        cobalt_parse = Act(ruledoc.akoma_ntoso)
        if section_name != "root":
            target = cobalt_parse.act.find(".//*[@eId='" + section_name + "']")
            return Response({'xml': lxml.etree.tostring(target),
                            'text': ' '.join(target.itertext())})
        else:
            return Response({'xml': '', 'text': ruledoc.ruledoc_name})
    else:
        return HttpResponseForbidden()

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def ruleDocExportView(request,user,rule):
    ruledoc = RuleDoc.objects.get(rule_slug=rule,owner=user)
    if request.user.has_perm('blawx.view_ruledoc',ruledoc):
        download = tempfile.NamedTemporaryFile('w',delete=False,prefix=user + "_" + rule + "_")
        download_filename = download.name
        download.write(serializers.serialize('yaml',RuleDoc.objects.filter(rule_slug=rule,owner=user)))
        sections = Workspace.objects.filter(ruledoc=ruledoc)
        if len(sections):
            download.write(serializers.serialize('yaml',sections))
        tests = BlawxTest.objects.filter(ruledoc=ruledoc)
        if len(tests):
            download.write(serializers.serialize('yaml',tests))
        download.close()
        response = FileResponse(open(download_filename,'rb'),as_attachment=True,filename=user + "_" + rule + ".blawx")
        return response
    else:
        return HttpResponseForbidden()

@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def ruleDocImportView(request):
    if request.method == "POST":

        if request.user.has_perm('blawx.add_ruledoc'):

            # The request should include a file.
            upload = request.FILES['loadfile']

            # Deserialize the contents of the file.
            new_objects = serializers.deserialize('yaml',upload.read())

            new_object_list = list(new_objects)
            # Get the RuleDoc, remove the PK, save it, and get the PK of the saved version.
            new_object_list[0].object.pk = None
            new_object_list[0].object.owner = request.user
            new_object_list[0].object.save()
            
            # Use the PK of the saved version to save the workspaces and tests
            for o in new_object_list[1:]:
                o.object.pk = None
                o.object.ruledoc = new_object_list[0].object
                o.object.save()
            # Now trigger the post-save for the RuleDoc object to set permissions on sub-objects.
            new_object_list[0].object.save()
            # Send the user back to root.
            return HttpResponseRedirect('/')
        else:
            return HttpResponseForbidden()
    else:
        return HttpResponseNotAllowed('POST')

@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def exampleLoadView(request,example_name):
    if request.user.has_perm('blawx.add_ruledoc'):
        # Load that file
        example = open('/app/blawx/blawx/static/blawx/examples/' + example_name + ".yaml")
        # Do the stuff in import.
        new_objects = serializers.deserialize('yaml',example.read())
        new_object_list = list(new_objects)
        # Get the RuleDoc, remove the PK, save it, and get the PK of the saved version.
        new_object_list[0].object.pk = None
        new_object_list[0].object.owner = request.user
        new_object_list[0].object.save()
        # Use the PK of the saved version to save the workspaces and tests
        for o in new_object_list[1:]:
            o.object.pk = None
            o.object.ruledoc = new_object_list[0].object
            o.object.save()
        # Now trigger the post-save for the RuleDoc object to set permissions on sub-objects.
        new_object_list[0].object.save()
        # Send the user back to root.
        return HttpResponseRedirect('/')
    else:
        return HttpResponseForbidden()


class BlawxView(PermissionRequiredMixin, generic.DetailView):
    permission_required = "blawx.view_ruledoc"
    template_name = 'blawx/blawx.html'
    model = RuleDoc

    def get_object(self, queryset=None):
        user = get_object_or_404(User, username=self.kwargs['user'])
        return get_object_or_404(RuleDoc, rule_slug=self.kwargs['rule'], owner=user)

    def get_queryset(self):
         user = User.objects.get(username=self.kwargs['user'])
         return RuleDoc.objects.filter(rule_slug=self.kwargs['rule'],owner=user)
    
    def get_context_data(self, **kwargs):
        context = super(BlawxView, self).get_context_data(**kwargs)
        user = User.objects.get(username=self.kwargs['user'])
        context['workspaces'] = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=user))
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class TestView(PermissionRequiredMixin, generic.DetailView):
    permission_required = "blawx.view_blawxtest"
    template_name = "blawx/test.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user']),test_name=self.kwargs['test_name'])
    
    def get_context_data(self, **kwargs):
        context = super(TestView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class BlawxBot(PermissionRequiredMixin, generic.DetailView):
    permission_required = "blawx.view_blawxtest"
    template_name = "blawx/bot.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user']),test_name=self.kwargs['test_name'])

class ScenarioEditor(PermissionRequiredMixin, generic.DetailView):
    permission_required = "blawx.view_blawxtest"
    template_name = "blawx/scenario_editor.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user']),test_name=self.kwargs['test_name'])
    
    def get_context_data(self, **kwargs):
        context = super(ScenarioEditor, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class ScenarioEditorGCWeb(PermissionRequiredMixin, generic.DetailView):
    permission_required = "blawx.view_blawxtest"
    template_name = "blawx/scenario_editor_gcweb.html"
    model = BlawxTest

    def get_object(self):
        return BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user']),test_name=self.kwargs['test_name'])
    
    def get_context_data(self, **kwargs):
        context = super(ScenarioEditorGCWeb, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context


class TestCreateView(PermissionRequiredMixin, CreateView):
    permission_required = "blawx.add_blawxtest_to_ruledoc"
    model = BlawxTest
    fields = ['test_name']
    
    def get_success_url(self):
        user = User.objects.get(username=self.kwargs['user'])
        return reverse_lazy('ruledoc', args=(user,self.kwargs['rule'],))
    
    def form_valid(self, form):
        form.instance.ruledoc = RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user'])
        return super().form_valid(form)
    
    # In this case we are not checking for permissions on the object being created, but it's container.
    def get_object(self):
        return RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user'])
    
    def get_context_data(self, **kwargs):
        context = super(TestCreateView, self).get_context_data(**kwargs)
        user = User.objects.get(username=self.kwargs['user'])
        context['ruledoc_list'] = RuleDoc.objects.all()
        context['ruledoc'] = RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=user)
        return context

class TestDeleteView(PermissionRequiredMixin, DeleteView):
    permission_required = "blawx.delete_blawxtest"
    model = BlawxTest

    def get_success_url(self):
        user = User.objects.get(username=self.kwargs['user'])
        return reverse_lazy('ruledoc', args=(user,self.kwargs['rule'],))
    
    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        target = RuleDoc.objects.get(rule_slug=self.kwargs['rule'],owner=self.kwargs['user'])
        if target.owner != self.request.user:
            return redirect(self.success_url) # This is sub-optimal.
        return super().post(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super(TestDeleteView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class RuleDocCreateView(PermissionRequiredMixin, CreateView):
    accept_global_perms = True
    permission_required = 'blawx.add_ruledoc'
    model = RuleDoc
    fields = ['ruledoc_name','rule_text','published']
    success_url = reverse_lazy('ruledocs')

    # This is a workaround to get the PermissionRequiredMixin to work with CreateView
    def get_object(self): return None

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)
    
    def get_context_data(self, **kwargs):
        context = super(RuleDocCreateView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class RuleDocDeleteView(PermissionRequiredMixin, DeleteView):
    permission_required = 'blawx.delete_ruledoc'
    model = RuleDoc
    success_url = reverse_lazy('ruledocs')

    def get_object(self, queryset=None):
        user = get_object_or_404(User, username=self.kwargs['user'])
        return get_object_or_404(RuleDoc, rule_slug=self.kwargs['rule'], owner=user)

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        if self.object.owner != self.request.user:
            return redirect(self.success_url)
        return super().post(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super(RuleDocDeleteView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class RuleDocEditView(PermissionRequiredMixin, UpdateView):
    permission_required = 'blawx.change_ruledoc'
    model = RuleDoc
    fields = ['ruledoc_name','rule_text','published']

    def get_object(self, queryset=None):
        user = get_object_or_404(User, username=self.kwargs['user'])
        return get_object_or_404(RuleDoc, rule_slug=self.kwargs['rule'], owner=user)

    def get_success_url(self):
        user = User.objects.get(username=self.kwargs['user'])
        return reverse_lazy('ruledoc', args=(user,self.kwargs['rule'],))
    
    def get_context_data(self, **kwargs):
        context = super(RuleDocEditView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

class DocumentView(generic.DetailView):
    model = DocPage
    template_name = "blawx/docs2.html"

    def get_queryset(self):
        return DocPage.objects.all()
    
    def get_context_data(self, **kwargs):
        context = super(DocumentView, self).get_context_data(**kwargs)
        context['ruledoc_list'] = RuleDoc.objects.all()
        return context

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def update_code(request,user,rule,workspace):
    target = Workspace.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),workspace_name=workspace)
    if request.user.has_perm('blawx.change_workspace',target):
        workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
        workspace_serializer.is_valid()
        target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
        target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
        target.save()
        return Response({"That probably worked."})
    else:
        return HttpResponseForbidden()


@api_view(['POST','GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_code(request,user,rule,workspace):
    ruledoctest = RuleDoc.objects.get(rule_slug=rule,owner=user)
    target = Workspace.objects.filter(ruledoc=ruledoctest,workspace_name=workspace)
    if (len(target) and request.user.has_perm('blawx.view_workspace',target[0])) or (not len(target) and request.user.has_perm('blawx.add_workspace_to_ruledoc',ruledoctest)):
        (workspace, created) = Workspace.objects.get_or_create(ruledoc=ruledoctest,workspace_name=workspace)
        return Response({"xml_content": workspace.xml_content})
    else:
        return HttpResponseForbidden()

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_all_code(request,user,rule):
    workspaces = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user))
    output = []
    for w in workspaces:
        if request.user.has_perm('blawx.view_workspace',w):
            output.append({"name": w.workspace_name, "xml_content": w.xml_content})
        else:
            return HttpResponseForbidden()
    return Response(output)

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def version(request):
    return Response({'version': settings.BLAWX_VERSION})

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def update_test(request,user,rule,test_name):
    target = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),test_name=test_name)
    if request.user.has_perm('blawx.change_blawxtest',target):
        workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
        workspace_serializer.is_valid()
        target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
        target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
        target.save()
        return Response({"That probably worked."})
    else:
        return HttpResponseForbidden()

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def update_test_view(request,user,rule,test_name):
    target = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),test_name=test_name)
    if request.user.has_perm('blawx.change_blawxtest',target):
        test_view_serializer = TestViewUpdateRequestSerializer(data=request.data)
        test_view_serializer.is_valid()
        target.view = str(request.data['view'])
        target.save()
        return Response({"Sure, let's say that worked."})
    else:
        return HttpResponseForbidden()

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def save_fact_scenario(request,user,rule,test_name):
    target = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),test_name=test_name)
    if request.user.has_perm('blawx.change_blawxtest',target):
        save_facts_serializer = SaveFactsRequestSerializer(data=request.data)
        save_facts_serializer.is_valid()
        target.fact_scenario = str(request.data['fact_scenario'])
        target.save()
        return Response({"Well, it didn't crash..."})
    else:
        return HttpResponseForbidden()

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def duplicate_test(request,user,rule,test_name):
    target_test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),test_name=test_name)
    target_rule = RuleDoc.objects.get(rule_slug=rule,owner=user)
    if request.user.has_perm("blawx.add_blawxtest_to_ruledoc",target_rule):
        # Create a new test from the existing one, use the request.data['new_test_name'], and save it.
        target_test.pk = None
        target_test.test_name = request.data["new_test_name"]
        target_test.save()
        return Response({"I think it probably worked."})
    else:
        return HttpResponseForbidden()


@api_view(['POST','GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_test(request,user,rule,test_name):
    ruledoctest = RuleDoc.objects.get(rule_slug=rule,owner=user)
    # Checking permissions here is weird. If it already exists, I need to check if they can change it.
    # If it doesn't exist, I need to check if they can add one.
    target = BlawxTest.objects.filter(ruledoc=ruledoctest,test_name=test_name)
    if (len(target) and request.user.has_perm('blawx.view_blawxtest',target[0])) or (not len(target) and request.user.has_perm('blawx.add_blawxtest_to_ruldoc',ruledoctest)):
        (test, created) = BlawxTest.objects.get_or_create(ruledoc=RuleDoc.objects.get(rule_slug=rule,owner=user),test_name=test_name)
        return Response({"xml_content": test.xml_content})
    else:
        return HttpResponseForbidden()
from django.views import generic
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import UserPassesTestMixin

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# from rest_framework import permissions

from .serializers import WorkspaceSerializer, CodeUpdateRequestSerializer
from .models import Workspace, DocPage, WorkspaceTemplate


# Create your views here.

class WorkspacesView(generic.ListView):
    template_name = 'blawx/index.html'
    context_object_name = 'workspace_list'

    def get_queryset(self):
        """
        Get the Workspaces on the server
        """
        return Workspace.objects.all()

class WorkspaceView(generic.DetailView):
    template_name = 'blawx/workspace.html'
    model = Workspace

    def get_queryset(self):
        return Workspace.objects.all()

class BlawxView(generic.DetailView):
    template_name = 'blawx/blawx.html'
    model = Workspace

    def get_queryset(self):
        return Workspace.objects.all()
    
    def get_context_data(self, **kwargs):
        context = super(BlawxView, self).get_context_data(**kwargs)
        context['templates'] = WorkspaceTemplate.objects.all()
        return context

class WorkspaceCreateView(CreateView):
    model = Workspace
    fields = ['workspace_name']
    success_url = reverse_lazy('blawx:workspaces')

class WorkspaceDeleteView(UserPassesTestMixin, DeleteView):
    model = Workspace
    success_url = reverse_lazy('blawx:workspaces')

    def test_func(self):
        if self.get_object().workspace_example:
            return self.request.user.is_authenticated
        else:
            return True

class WorkspaceUpdateView(UserPassesTestMixin, UpdateView):
    model = Workspace
    fields = ['workspace_name']

    def test_func(self):
        if self.get_object().workspace_example:
            return self.request.user.is_authenticated
        else:
            return True


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
@permission_classes([AllowAny])
def update_code(request,pk):
    target = Workspace.objects.get(pk=pk)
    if target.workspace_example and not request.user.is_authenticated:
            return Response("Not permitted for examples.")
    workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
    workspace_serializer.is_valid()
    target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
    target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
    target.save()
    return Response({"That probably worked."})

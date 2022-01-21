from django.shortcuts import render
from django.views import generic
from .models import Workspace, Query
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
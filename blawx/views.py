from django.shortcuts import render
from django.views import generic
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.urls import reverse_lazy, reverse

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

class BlawxView(generic.DetailView):
    template_name = 'blawx/blawx.html'
    model = Workspace

    def get_queryset(self):
        return Workspace.objects.all()

class WorkspaceCreateView(CreateView):
    model = Workspace
    fields = ['workspace_name']
    success_url = reverse_lazy('blawx:workspaces')

class WorkspaceDeleteView(DeleteView):
    model = Workspace
    success_url = reverse_lazy('blawx:workspaces')

class WorkspaceUpdateView(UpdateView):
    model = Workspace
    fields = ['workspace_name']
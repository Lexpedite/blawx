from django.shortcuts import render
from django.views import generic
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.views.generic import TemplateView
from django.urls import reverse_lazy, reverse

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
# from rest_framework import permissions

from .serializers import WorkspaceSerializer, CodeUpdateRequestSerializer
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

class DocumentView(TemplateView):
    template_name = "blawx/docs.html"



class WorkspaceAPIViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def update_code(request,pk): # /url-mapping is blawx/1/update
    target = Workspace.objects.get(pk=pk)
    workspace_serializer = CodeUpdateRequestSerializer(data=request.data)
    workspace_serializer.is_valid()
    target.xml_content = workspace_serializer.validated_data.get('xml_content', target.xml_content)
    target.scasp_encoding = workspace_serializer.validated_data.get('scasp_encoding', target.scasp_encoding)
    target.save()
    return Response({"That probably worked."})

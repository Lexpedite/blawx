from .models import Workspace
from rest_framework import serializers


class WorkspaceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Workspace
        fields = ['workspace_name', 'xml_content', 'scasp_encoding']

class CodeUpdateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['xml_content', 'scasp_encoding']
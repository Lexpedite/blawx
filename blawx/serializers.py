from .models import Workspace
from rest_framework import serializers

class CodeUpdateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['xml_content', 'scasp_encoding']
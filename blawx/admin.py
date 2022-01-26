from django.contrib import admin

# Register your models here.
from .models import Workspace

class WorkspaceAdmin(admin.ModelAdmin):
    fields = ['workspace_name','xml_content','scasp_encoding','workspace_example']

admin.site.register(Workspace,WorkspaceAdmin)

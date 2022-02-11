from django.contrib import admin

# Register your models here.
from .models import Workspace

class WorkspaceAdmin(admin.ModelAdmin):
    fields = ['workspace_name','xml_content','scasp_encoding', 'akoma_ntoso']

admin.site.register(Workspace,WorkspaceAdmin)

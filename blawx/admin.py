from django.contrib import admin

# Register your models here.
from .models import Workspace, DocPage

class WorkspaceAdmin(admin.ModelAdmin):
    fields = ['workspace_name','xml_content','scasp_encoding','workspace_example']

class DocPageAdmin(admin.ModelAdmin):
    fields = ['title','content','path']

admin.site.register(Workspace,WorkspaceAdmin)
admin.site.register(DocPage,DocPageAdmin)

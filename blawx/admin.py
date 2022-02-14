from django.contrib import admin

# Register your models here.
from .models import Workspace

class WorkspaceAdmin(admin.ModelAdmin):
    fields = ['ruledoc','workspace_name','xml_content','scasp_encoding']

class RuleDocAdmin(admin.ModelAdmin):
    fields = ['ruledoc_name','scasp_encoding','akoma_ntoso']

admin.site.register(Workspace,WorkspaceAdmin)

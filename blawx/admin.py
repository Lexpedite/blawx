from django.contrib import admin

# Register your models here.
from .models import Workspace, RuleDoc, BlawxTest

class WorkspaceAdmin(admin.ModelAdmin):
    fields = ['ruledoc','workspace_name','xml_content','scasp_encoding']

class RuleDocAdmin(admin.ModelAdmin):
    fields = ['ruledoc_name','scasp_encoding','akoma_ntoso']

class BlawxTestAdmin(admin.ModelAdmin):
    fields = ['ruledoc','test_name','xml_content','scasp_encoding']

admin.site.register(Workspace,WorkspaceAdmin)
admin.site.register(RuleDoc,RuleDocAdmin)
admin.site.register(BlawxTest,BlawxTestAdmin)

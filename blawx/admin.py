from django.contrib import admin

from guardian.admin import GuardedModelAdmin
from preferences.admin import PreferencesAdmin
# Register your models here.
from .models import Workspace, RuleDoc, BlawxTest, BlawxPreference

class WorkspaceAdmin(GuardedModelAdmin):
    fields = ['ruledoc','workspace_name','xml_content','scasp_encoding']

class RuleDocAdmin(GuardedModelAdmin):
    fields = ['ruledoc_name','scasp_encoding','tutorial','owner','published']

class BlawxTestAdmin(GuardedModelAdmin):
    fields = ['ruledoc','test_name','xml_content','scasp_encoding', 'tutorial', 'view', 'fact_scenario']


admin.site.register(BlawxPreference, PreferencesAdmin)
admin.site.register(Workspace,WorkspaceAdmin)
admin.site.register(RuleDoc,RuleDocAdmin)
admin.site.register(BlawxTest,BlawxTestAdmin)

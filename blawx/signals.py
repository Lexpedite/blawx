from django.dispatch import receiver
from django.db.models.signals import post_save
from guardian.shortcuts import assign_perm, remove_perm
from guardian.utils import get_anonymous_user
from .models import RuleDoc

@receiver(post_save, sender=RuleDoc)
def ruledoc_post_save(sender, **kwargs):
    """
    Give the owner all the relevant permission to the ruledoc, all
    its workspaces, and all its tests. If the ruledoc is published,
    give the anonymous user read and run permissions to the same.
    """
    ruledoc = kwargs['instance']
    anon = get_anonymous_user()
    if ruledoc.published:
        assign_perm('view_ruledoc', anon, ruledoc)
        for w in ruledoc.workspaces.all():
            assign_perm('view_workspace', anon, w)
        for t in ruledoc.tests.all():
            assign_perm('view_blawxtest', anon, t)
            assign_perm('run', anon, t)
    else:
        remove_perm('view_ruledoc', anon, ruledoc)
        for w in ruledoc.workspaces.all():
            remove_perm('view_workspace', anon, w)
        for t in ruledoc.tests.all():
            remove_perm('view_blawxtest', anon, t)
            remove_perm('run', anon, t)
    # Assign all permissions to the owner.
    ruledoc_permissions = ['view_ruledoc','add_ruledoc','change_ruledoc','delete_ruledoc']
    workspace_permissions = ['view_workspace','add_workspace','change_workspace','delete_workspace']
    test_permissions = ['view_blawxtest','add_blawxtest','change_blawxtest','delete_blawxtest','run']
    for rp in ruledoc_permissions:
        assign_perm(rp,ruledoc.owner,ruledoc)
    for w in ruledoc.workspaces.all():
        for wp in workspace_permissions:
            assign_perm(wp,ruledoc.owner,w)
    for t in ruledoc.tests.all():
        for tp in test_permissions:
            assign_perm(tp,ruledoc.owner,t)
    

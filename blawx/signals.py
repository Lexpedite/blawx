from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from guardian.shortcuts import assign_perm, remove_perm
from guardian.utils import get_anonymous_user
from .models import RuleDoc, BlawxTest, Workspace

@receiver(post_save, sender=User)
def user_post_save(sender, **kwargs):
    """
    When a user is created, other than anonymous, give them permission to create ruledocs.
    """
    user = kwargs['instance']
    if user != get_anonymous_user():
        assign_perm('add_ruledoc',user)

@receiver(post_save,sender=BlawxTest)
def blawxtest_post_save(sender, **kwargs):
    """
    When a test is created, give the owner permission to change, view, run, and delete it.
    """
    test = kwargs['instance']
    perms = ['view_blawxtest','change_blawxtest','delete_blawxtest','run']
    for p in perms:
        assign_perm(p,test.ruledoc.owner,test) #Interested to see if this works.

@receiver(post_save,sender=Workspace)
def workspace_post_save(sender, **kwargs):
    """
    When a workspace is created, give the owner permission to change, view, and delete it.
    """
    workspace = kwargs['instance']
    perms = ['view_workspace','change_workspace','delete_workspace']
    for p in perms:
        assign_perm(p,workspace.ruledoc.owner,workspace)


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
    ruledoc_permissions = ['view_ruledoc','add_ruledoc','change_ruledoc','delete_ruledoc', 'add_blawxtest_to_ruledoc', 'add_workspace_to_ruledoc']
    workspace_permissions = ['view_workspace','add_workspace','change_workspace','delete_workspace']
    test_permissions = ['view_blawxtest','add_blawxtest','change_blawxtest','delete_blawxtest','run']
    for rp in ruledoc_permissions:
        assign_perm(rp,ruledoc.owner,ruledoc)
    # Resetting the permissions on all the associated objects MIGHT be necessary if the owner was the thing that changed,
    # so we are doing it here as boots and suspenders sort of thing.
    # There is probably a better way.
    for w in ruledoc.workspaces.all():
        for wp in workspace_permissions:
            assign_perm(wp,ruledoc.owner,w)
    for t in ruledoc.tests.all():
        for tp in test_permissions:
            assign_perm(tp,ruledoc.owner,t)
    

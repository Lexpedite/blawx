from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import User
from .parse_an import generate_tree
from cobalt.hierarchical import Act
from clean.clean import generate_akn
from preferences.models import Preferences
from django.utils.text import slugify

# Create your models here.
class RuleDoc(models.Model):
    ruledoc_name = models.CharField(max_length=200)
    rule_text = models.TextField(default="Default Act")
    rule_slug = models.TextField()
    akoma_ntoso = models.TextField(default="",blank=True)
    navtree = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)
    tutorial = models.TextField(default="",blank=True)
    owner = models.ForeignKey(User,on_delete=models.CASCADE,)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.ruledoc_name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['rule_slug','owner'],name='unique_owner_and_rule_slug')
        ]
        permissions = [
            ('add_blawxtest_to_ruledoc', 'Can add Test to RuleDoc'),
            ('add_workspace_to_ruledoc', 'Can add Workspace to RuleDoc'),
        ]

@receiver(pre_save, sender=RuleDoc)
def update_an_nav(sender, instance, **kwargs):
    instance.akoma_ntoso = generate_akn(instance.rule_text)
    instance.navtree = generate_tree(Act(instance.akoma_ntoso).act)
    instance.rule_slug = slugify(instance.ruledoc_name)

class Workspace(models.Model):
    ruledoc = models.ForeignKey(RuleDoc, related_name='workspaces', on_delete=models.CASCADE)
    workspace_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)

    def __str__(self):
        return self.workspace_name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['ruledoc','workspace_name'],name='unique_workspace_and_ruledoc')
        ]

class BlawxTest(models.Model):
    ruledoc = models.ForeignKey(RuleDoc, related_name='tests', on_delete=models.CASCADE)
    test_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)
    tutorial = models.TextField(default="",blank=True)
    view = models.TextField(default="",blank=True)
    fact_scenario = models.TextField(default="",blank=True)
    agenda_code = models.TextField(default="",blank=True)
    agenda_yaml = models.TextField(default="",blank=True)

    def __str__(self):
        return self.test_name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['ruledoc','test_name'],name='unique_test_and_ruledoc')
        ]
        permissions = [
            ('run', 'Run Test'),
        ]
        

class Query(models.Model):
    ruledoc = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    query_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="",blank=True)
    published = models.BooleanField()

    def __str__(self):
        return self.query_name

class DocPage(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    path = models.CharField(primary_key = True, max_length=200)

    def __str__(self):
        return self.title

class BlawxPreference(Preferences):
    __module__ = 'preferences.models'
    allow_registration = models.BooleanField(default=True)

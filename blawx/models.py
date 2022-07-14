from django.db import models
from django.contrib.auth.models import User
from .parse_an import generate_tree
from cobalt.hierarchical import Act
from clean.clean import generate_akn

# Create your models here.
class RuleDoc(models.Model):
    ruledoc_name = models.CharField(max_length=200)
    rule_text = models.TextField(default="Default Act")
    # akoma_ntoso = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)
    tutorial = models.TextField(default="",blank=True)
    owner = models.ForeignKey(User,on_delete=models.CASCADE,)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.ruledoc_name

    @property
    def akoma_ntoso(self):
        return generate_akn(self.rule_text)

    @property
    def navtree(self):
        an_act = Act(self.akoma_ntoso)
        return generate_tree(an_act.act)

class Workspace(models.Model):
    ruledoc = models.ForeignKey(RuleDoc, on_delete=models.CASCADE)
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


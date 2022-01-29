from django.db import models

# Create your models here.
class Workspace(models.Model):
    workspace_name = models.CharField(max_length=200)
    workspace_example = models.BooleanField(default=False) # Example workspaces cannot be deleted from the web interface.
    xml_content = models.TextField(default="")
    scasp_encoding = models.TextField(default="")

    def __str__(self):
        return self.workspace_name


class Query(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    query_name = models.CharField(max_length=200)
    published = models.BooleanField()

    def __str__(self):
        return self.query_name + " inside " + self.workspace + " not" if not self.published else "" + " published"

class DocPage(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    path = models.CharField(primary_key = True, max_length=200)

    def __str__(self):
        return self.title


from django.db import models

# Create your models here.
class Workspace(models.Model):
    workspace_name = models.CharField(max_length=200)

    def __str__(self):
        return self.workspace_name

class Query(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    query_name = models.CharField(max_length=200)
    published = models.BooleanField()

    def __str__(self):
        return self.query_name + " inside " + self.workspace + " not" if not self.published else "" + " published"

class BlawxCode(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    xml_content = models.TextField()

    def __str__(self):
        return self.workspace + " BlawxCode"
# Generated by Django 4.0.1 on 2022-01-25 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blawx', '0003_blawxcode_scasp_encoding_alter_blawxcode_xml_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='workspace',
            name='workspace_example',
            field=models.BooleanField(default=False),
        ),
    ]

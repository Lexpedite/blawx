# Generated by Django 4.0.1 on 2022-06-30 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blawx', '0018_ruledoc_tutorial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blawxtest',
            name='tutorial',
            field=models.TextField(blank=True, default=''),
        ),
    ]
# Generated by Django 4.0.1 on 2022-07-15 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blawx', '0025_alter_blawxtest_ruledoc'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ruledoc',
            options={'permissions': [('add_blawxtest_to_ruledoc', 'Can add Test to RuleDoc'), ('add_workspace_to_ruledoc', 'Can add Workspace to RuleDoc')]},
        ),
        migrations.AlterField(
            model_name='workspace',
            name='ruledoc',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workspaces', to='blawx.ruledoc'),
        ),
    ]
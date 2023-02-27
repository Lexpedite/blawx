import os
import django
from pathlib import Path
from django.core import management


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blawx.settings')

django.setup()

source = Path.cwd() / "blawx" / "fixtures"

for file in source.rglob("*.yaml"):
    management.call_command('loaddata', file)
for file in source.rglob("*.blawx"):
    management.call_command('loaddata', file)

# This import statement will fail if it is placed before the .setup() lines above.
from django.contrib.auth.models import Group
Group.objects.create(name="All users")
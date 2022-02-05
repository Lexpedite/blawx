import os
import django
from pathlib import Path
from django.core import management

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newblawx.settings')

django.setup()

source = Path.cwd() / "blawx" / "fixtures"

for file in source.rglob("*.yaml"):
    management.call_command('loaddata', file)
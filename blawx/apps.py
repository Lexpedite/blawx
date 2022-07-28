from django.apps import AppConfig


class BlawxConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blawx'
    
    def ready(self):
        # This implicitly connects signal receivers.
        from . import signals


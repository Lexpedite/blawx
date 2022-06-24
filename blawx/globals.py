from django.conf import settings

def global_vars(request):
    return {'BLAWX_VERSION': settings.BLAWX_VERSION}
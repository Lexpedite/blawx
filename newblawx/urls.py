"""newblawx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('blawx/', include('blawx.urls')),
    path('admin/', admin.site.urls),
]

# from django.views import generic
# from django.forms import modelform_factory
# from django.urls import path
# from django.apps import apps

# blawx = apps.get_app_config('blawx')

# for model in blawx.get_models():
#     create_url = path(
#         f"{model.__name__.lower()}/create/",
#         generic.CreateView.as_view(
#             form_class=modelform_factory(model=model, fields='__all__'),
#             template_name=f"{model._meta.app_label}/create.html",
#             model=model
#         ),
#     ),
#     list_url = path(
#         f"{model.__name__.lower()}/",
#         generic.ListView.as_view(
#             template_name=f"{model._meta.app_label}/list.html",
#             model=model
#         ),
#     ),
#     read_url = path(
#         f"{model.__name__.lower()}/read/",
#         generic.DetailView.as_view(
#             template_name=f"{model._meta.app_label}/read.html",
#             model=model
#         ),
#     ),
#     update_url = path(
#         f"{model.__name__.lower()}/update/",
#         generic.UpdateView.as_view(
#             template_name=f"{model._meta.app_label}/update.html",
#             model=model
#         ),
#     ),
#     delete_url = path(
#         f"{model.__name__.lower()}/delete/",
#         generic.DeleteView.as_view(
#             template_name=f"{model._meta.app_label}/delete.html",
#             model=model
#         ),
#     )
#     urlpatterns.extend([create_url, list_url, read_url, update_url, delete_url])
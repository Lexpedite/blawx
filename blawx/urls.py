from django.urls import path

from . import views

app_name = 'blawx'
urlpatterns = [
    path('', views.WorkspacesView.as_view(), name='workspaces'),
    path('<int:pk>/', views.WorkspaceView.as_view(), name='workspace'),
]
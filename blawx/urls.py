from django.urls import path

from . import views

app_name = 'blawx'
urlpatterns = [
    path('', views.WorkspacesView.as_view(), name='workspaces'),
    path('<int:pk>/', views.WorkspaceView.as_view(), name='workspace'),
    path('<int:pk>/code/', views.BlawxView.as_view(), name="code"),
    path('<int:pk>/update/', views.WorkspaceUpdateView.as_view(), name="workspace_update"),
    path('<int:pk>/delete/', views.WorkspaceDeleteView.as_view(), name="workspace_delete"),
    path('create/', views.WorkspaceCreateView.as_view(), name="workspace_create"),
]


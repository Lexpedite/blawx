from django.urls import include, path
from rest_framework import routers
from . import views, reasoner


router = routers.DefaultRouter()
router.register(r'workspaces', views.WorkspaceAPIViewSet)

app_name = 'blawx'
urlpatterns = [
    path('', views.WorkspacesView.as_view(), name='workspaces'),
    path('<int:pk>/', views.WorkspaceView.as_view(), name='workspace'),
    path('<int:pk>/code/', views.BlawxView.as_view(), name="code"),
    path('<int:pk>/update/', views.update_code),
    path('<int:pk>/delete/', views.WorkspaceDeleteView.as_view(), name="workspace_delete"),
    path('create/', views.WorkspaceCreateView.as_view(), name="workspace_create"),
    path('docs/<path:path>', views.DocumentView.as_view(), name="docs"),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('query/<str:workspace>/<str:query>/', reasoner.run_query),
    path('<int:pk>/run/', reasoner.run_workspace, name="runcode"),
]

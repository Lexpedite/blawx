from django.urls import include, path
from rest_framework import routers
from . import views, reasoner


router = routers.DefaultRouter()
router.register(r'workspaces', views.WorkspaceAPIViewSet)

app_name = 'blawx'
urlpatterns = [
    path('', views.RuleDocsView.as_view(), name='ruledocs'),
    path('<int:pk>/', views.RuleDocView.as_view(), name='ruledoc'),
    path('<int:pk>/edit/', views.RuleDocEditView.as_view(), name='ruledoc_edit'),
    path('<int:pk>/code/', views.BlawxView.as_view(), name="code"),
    path('<int:pk>/<str:workspace>/update/', views.update_code, name="update_workspace_code"),
    path('<int:pk>/<str:workspace>/get/', views.get_code, name="get_workspace_code"),
    path('<int:pk>/delete/', views.RuleDocDeleteView.as_view(), name="ruledoc_delete"),
    path('create/', views.RuleDocCreateView.as_view(), name="ruledoc_create"),
    path('docs/<path:pk>/', views.DocumentView.as_view(), name="docs_page"),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('query/<str:workspace>/<str:query>/', reasoner.run_query),
    # path('<int:pk>/run/', reasoner.run_workspace, name="runcode"),
    path('example/<int:pk>/', views.get_example),
]

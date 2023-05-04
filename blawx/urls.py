from django.contrib import admin
from django.urls import include, path
from . import views, reasoner
from django.contrib.auth.views import LoginView, LogoutView, PasswordChangeDoneView, PasswordChangeView
from .models import RuleDoc

app_name = 'blawx'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')), # The following 4 lines override four addresses with additional context data
    path('accounts/login', LoginView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="login"),
    path('accounts/logout', LogoutView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="logout"),
    path('accounts/password_change', PasswordChangeView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="password_change"),
    path('accounts/password_change_done', PasswordChangeDoneView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="password_change_done"),
    path('', views.RuleDocsView.as_view(), name='ruledocs'),
    path('import/', views.ruleDocImportView, name="import"),
    path('load_example/<slug:example_name>/',views.exampleLoadView, name="load"),
    path('<int:pk>/', views.RuleDocView.as_view(), name='ruledoc'),
    path('<int:pk>/rule/<slug:section_name>/', views.ruleDocLegalTextView, name="ruledoc_text"),
    path('<int:pk>/edit/', views.RuleDocEditView.as_view(), name='ruledoc_edit'),
    path('<int:pk>/code/', views.BlawxView.as_view(), name="code"),
    path('<int:pk>/export/', views.ruleDocExportView, name="export"),
    path('<int:pk>/test/new/', views.TestCreateView.as_view(), name="new_test"),
    path('<int:pk>/test/<slug:test_name>/', views.TestView.as_view(), name="test"),
    path('<int:pk>/test/<slug:test_name>/delete/', views.TestDeleteView.as_view(), name="delete_test"),
    path('<int:ruledoc>/test/<slug:test_name>/get/', views.get_test, name="get_test_code"),
    path('<int:ruledoc>/test/<slug:test_name>/update/', views.update_test, name="update_test_code"),
    path('<int:ruledoc>/test/<slug:test_name>/update_view/', views.update_test_view, name="update_test_view"),
    path('<int:ruledoc>/test/<slug:test_name>/save_facts/', views.save_fact_scenario, name="save_fact_scenario"),
    path('<int:ruledoc>/test/<slug:test_name>/duplicate/', views.duplicate_test, name="duplicate_test"),
    path('<int:ruledoc>/test/<slug:test_name>/run/',reasoner.run_test, name="run_test"),
    path('<int:ruledoc>/test/<slug:test_name>/onto/',reasoner.get_ontology, name="test_onto"),
    path('<int:ruledoc>/test/<slug:test_name>/interview/',reasoner.interview, name="test_interview"),
    path('<int:ruledoc>/test/<slug:test_name>/bot/',views.BlawxBot.as_view(), name="blawx_bot"),
    path('<int:ruledoc>/test/<slug:test_name>/scenario/',views.ScenarioEditor.as_view(), name="scenario_editor"),
    path('<int:pk>/<str:workspace>/update/', views.update_code, name="update_workspace_code"),
    path('<int:pk>/all/get/', views.get_all_code, name="get_all_workspaces_code"),
    path('<int:pk>/<str:workspace>/get/', views.get_code, name="get_workspace_code"),
    path('<int:pk>/delete/', views.RuleDocDeleteView.as_view(), name="ruledoc_delete"),
    path('create/', views.RuleDocCreateView.as_view(), name="ruledoc_create"),
    path('docs/<path:pk>/', views.DocumentView.as_view(), name="docs_page"),
    path("register/", views.register_request, name="register"),
    path("version/",views.version,name="version"),
]

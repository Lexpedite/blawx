from django.contrib import admin
from django.urls import include, path
from . import views, reasoner, simplifier
from django.contrib.auth.views import LoginView, LogoutView, PasswordChangeDoneView, PasswordChangeView
from .models import RuleDoc

app_name = 'blawx'
urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')), # The following 4 lines override four addresses with additional context data
    path('accounts/login', LoginView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="login"),
    path('accounts/logout', LogoutView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="logout"),
    path('accounts/password_change', PasswordChangeView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="password_change"),
    path('accounts/password_change_done', PasswordChangeDoneView.as_view(extra_context={'ruledoc_list': RuleDoc.objects.all()}),name="password_change_done"),
    path('', views.RuleDocsView.as_view(), name='ruledocs'),
    path('docs/<path:pk>/', views.DocumentView.as_view(), name="docs_page"),
    path('import/', views.ruleDocImportView, name="import"),
    path('load_example/<slug:example_name>/',views.exampleLoadView, name="load"),
    path('<user>/<slug:rule>/', views.RuleDocView.as_view(), name='ruledoc'),
    path('<user>/<slug:rule>/rule/<slug:section_name>/', views.ruleDocLegalTextView, name="ruledoc_text"),
    path('<user>/<slug:rule>/edit/', views.RuleDocEditView.as_view(), name='ruledoc_edit'),
    path('<user>/<slug:rule>/code/', views.BlawxView.as_view(), name="code"),
    path('<user>/<slug:rule>/export/', views.ruleDocExportView, name="export"),
    path('<user>/<slug:rule>/test/new/', views.TestCreateView.as_view(), name="new_test"),
    path('<user>/<slug:rule>/test/<slug:test_name>/', views.TestView.as_view(), name="test"),
    path('<user>/<slug:rule>/test/<slug:test_name>/delete/', views.TestDeleteView.as_view(), name="delete_test"),
    path('<user>/<slug:rule>/test/<slug:test_name>/get/', views.get_test, name="get_test_code"),
    path('<user>/<slug:rule>/test/<slug:test_name>/update/', views.update_test, name="update_test_code"),
    path('<user>/<slug:rule>/test/<slug:test_name>/update_view/', views.update_test_view, name="update_test_view"),
    path('<user>/<slug:rule>/test/<slug:test_name>/save_facts/', views.save_fact_scenario, name="save_fact_scenario"),
    path('<user>/<slug:rule>/test/<slug:test_name>/duplicate/', views.duplicate_test, name="duplicate_test"),
    path('<user>/<slug:rule>/test/<slug:test_name>/run/',reasoner.run_test, name="run_test"),
    path('<user>/<slug:rule>/test/<slug:test_name>/onto/',reasoner.get_ontology, name="test_onto"),
    path('<user>/<slug:rule>/test/<slug:test_name>/interview/',reasoner.interview, name="test_interview"),
    path('<user>/<slug:rule>/test/<slug:test_name>/bot/',views.BlawxBot.as_view(), name="blawx_bot"),
    path('<user>/<slug:rule>/test/<slug:test_name>/scenario/',views.ScenarioEditor.as_view(), name="scenario_editor"),
    path('<user>/<slug:rule>/test/<slug:test_name>/scenario_gcweb/',views.ScenarioEditorGCWeb.as_view(), name="scenario_editor_gcweb"),
    path('<user>/<slug:rule>/<str:workspace>/update/', views.update_code, name="update_workspace_code"),
    path('<user>/<slug:rule>/all/get/', views.get_all_code, name="get_all_workspaces_code"),
    path('<user>/<slug:rule>/<str:workspace>/get/', views.get_code, name="get_workspace_code"),
    path('<user>/<slug:rule>/delete/', views.RuleDocDeleteView.as_view(), name="ruledoc_delete"),
    path('create/', views.RuleDocCreateView.as_view(), name="ruledoc_create"),
    path("register/", views.register_request, name="register"),
    path("version/",views.version,name="version"),
    path("simplify/",simplifier.simplify, name="simplify"),
    path('admin/', admin.site.urls),
]

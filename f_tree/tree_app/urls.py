from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [

	path('', views.IndexView.as_view(), name='index'),

	path('<int:pk>/tree/', views.detail, name='detail'),

    path('<int:pk>/', views.tree, name='tree'),

    path('<int:pk>/vote/', views.vote, name='vote'),
	path('<int:pk>/agawa/',views.tree_data, name='tree_data')
	#url(r'^tree/$', 'tree_data')
]
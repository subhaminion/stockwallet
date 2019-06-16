from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from stockwallet.views import BalanceViewSet, UserViewset
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'balance', BalanceViewSet)
router.register(r'user', UserViewset)


urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    # re_path('./*', TemplateView.as_view(template_name='index.html'))
]

from django.urls import include, path
from rest_framework import routers
from stockwallet.views import BalanceViewSet


router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
router.register(r'groups', BalanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

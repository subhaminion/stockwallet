from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from stockwallet.models import Balance
from stockwallet.serializer import BalanceSerializer, UserSerializer

class BalanceViewSet(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer

    def list(self, request):
        queryset = Balance.objects.all()
        serializer = BalanceSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        print(kwargs.get('pk'))
        print(request.data.get('curr_balance'))
        user = User.objects.get()
        user_balance = user.balance_set.first()
        user_balance.curr_balance = request.data.get('curr_balance')
        user_balance.save()
        return Response(status.HTTP_200_OK)



class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

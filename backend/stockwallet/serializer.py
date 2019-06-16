from django.contrib.auth.models import User
from rest_framework import serializers
from stockwallet.models import Balance


class UserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    username = serializers.CharField()
    # balance = BalanceSerializer(source='balance_set')
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class BalanceSerializer(serializers.Serializer):
    curr_balance = serializers.DecimalField(max_digits=15, decimal_places=2)
    user = UserSerializer()
    class Meta:
        model = Balance
        fields = ['user', 'curr_balance']

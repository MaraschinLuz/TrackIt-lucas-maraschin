from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Equipe, StatusProblema, Problema, PerfilUsuario

class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = ['id', 'nome', 'descricao']

class StatusProblemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusProblema
        fields = ['id', 'nome', 'descricao', 'cor']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='user'
    )
    equipe = EquipeSerializer(read_only=True)
    equipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Equipe.objects.all(), write_only=True, source='equipe', allow_null=True, required=False
    )

    class Meta:
        model = PerfilUsuario
        fields = ['id', 'user', 'user_id', 'equipe', 'equipe_id']

class ProblemaSerializer(serializers.ModelSerializer):
    criado_por = UserSerializer(read_only=True)
    status = StatusProblemaSerializer(read_only=True)
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=StatusProblema.objects.all(), source='status', write_only=True
    )
    equipe = EquipeSerializer(read_only=True)
    equipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Equipe.objects.all(), source='equipe', write_only=True, allow_null=True, required=False
    )

    class Meta:
        model = Problema
        fields = ['id', 'titulo', 'descricao', 'status', 'status_id',
                  'criado_em', 'atualizado_em', 'criado_por', 'equipe', 'equipe_id']

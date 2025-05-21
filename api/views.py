from django.http import JsonResponse
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import Equipe, StatusProblema, Problema, PerfilUsuario
from .serializers import (
    EquipeSerializer, StatusProblemaSerializer, ProblemaSerializer,
    UserSerializer, PerfilUsuarioSerializer
)

class EquipeViewSet(viewsets.ModelViewSet):
    queryset = Equipe.objects.all()
    serializer_class = EquipeSerializer
    permission_classes = [permissions.IsAuthenticated]

class StatusProblemaViewSet(viewsets.ModelViewSet):
    queryset = StatusProblema.objects.all()
    serializer_class = StatusProblemaSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProblemaViewSet(viewsets.ModelViewSet):
    queryset = Problema.objects.all()
    serializer_class = ProblemaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]


def home(request):
    return JsonResponse({'message': 'Bem-vindo à API do sistema!'})


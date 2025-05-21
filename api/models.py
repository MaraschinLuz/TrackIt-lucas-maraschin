from django.db import models
from django.contrib.auth.models import User


class Equipe(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome
    
class StatusProblema(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField(blank=True, null=True)
    cor = models.CharField(max_length=7, default='#000000')  # Cor hexadecimal

    def __str__(self):
        return self.nome

class Problema(models.Model):
    titulo = models.CharField(max_length=150)
    descricao = models.TextField()
    status = models.ForeignKey(StatusProblema, on_delete=models.PROTECT)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE)
    equipe = models.ForeignKey(Equipe, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.titulo




class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    equipe = models.ForeignKey(Equipe, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.user.username



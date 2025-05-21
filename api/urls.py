from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EquipeViewSet, StatusProblemaViewSet, ProblemaViewSet,
    UserViewSet, PerfilUsuarioViewSet
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from .views import home

urlpatterns = [
    path('', home),  # Rota raiz para API
    path('equipes/', EquipeViewSet.as_view({'get': 'list'})),
    # ... suas outras rotas
]

router = DefaultRouter()
router.register(r'equipes', EquipeViewSet)
router.register(r'status', StatusProblemaViewSet)
router.register(r'problemas', ProblemaViewSet)
router.register(r'usuarios', UserViewSet)
router.register(r'perfis', PerfilUsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

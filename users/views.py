import json # Adicionar este import se ainda não estiver
from django.shortcuts import render
from django.http import JsonResponse
from .models import User
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError # Importa para o caso de erro

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        
        # 1. LER CORPO JSON
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        # Validação de campos necessários
        if not name or not email or not password:
             return JsonResponse({"error": "Por favor, preencha todos os campos."}, status=400)

        # 2. NOVO: VERIFICAÇÃO DE E-MAIL JÁ CADASTRADO (A SOLUÇÃO PARA O SEU ERRO)
        if User.objects.filter(email=email).exists():
            # Retorna um código 409 Conflict para o frontend, indicando conflito de recurso
            return JsonResponse({"error": "Este e-mail já está cadastrado. Por favor, use outro."}, status=409)

        # Hash da senha antes de salvar
        hashed_password = make_password(password)

        try:
            # 3. Criar o usuário no banco de dados
            user = User.objects.create(name=name, email=email, password=hashed_password)
            
            return JsonResponse({"message": "Usuário cadastrado com sucesso!", "user": {"name": user.name, "email": user.email}}, status=201)
            
        except IntegrityError:
            # Fallback para outros erros de banco de dados
            return JsonResponse({"error": "Ocorreu um erro inesperado no banco de dados."}, status=500)
        
    return JsonResponse({"error": "Método não permitido."}, status=405)

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        
        # LER CORPO JSON (Garantindo que o login também use JSON)
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
            
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "Usuário não encontrado."}, status=404)

        # Verificar se a senha fornecida é válida
        if check_password(password, user.password):
            return JsonResponse({"message": "Login successful", "user": {"name": user.name, "email": user.email}})
        else:
            return JsonResponse({"error": "Senha inválida."}, status=400)
        
    return JsonResponse({"error": "Método não permitido."}, status=405)
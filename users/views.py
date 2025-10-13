from django.shortcuts import render
from django.http import JsonResponse
from .models import User
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password


@csrf_exempt  # Desativa CSRF para fins de teste. Use segurança adequada em produção.
def register_user(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Hash da senha antes de salvar
        hashed_password = make_password(password)

        # Criar o usuário no banco de dados
        user = User.objects.create(name=name, email=email, password=hashed_password)
        
        return JsonResponse({"message": "User registered successfully!", "user": {"name": user.name, "email": user.email}}, status=201)

@csrf_exempt  # Desativa CSRF para fins de teste. Use segurança adequada em produção.
def login_user(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        # Verificar se a senha fornecida é válida
        if check_password(password, user.password):
            return JsonResponse({"message": "Login successful", "user": {"name": user.name, "email": user.email}})
        else:
            return JsonResponse({"error": "Invalid password"}, status=400)
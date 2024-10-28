from django.shortcuts import render
from django.contrib.auth.models import User
from .models import toDoList
from .serializers import UserSerializer, ToDoSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.


class createUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class createToDo (generics.ListCreateAPIView):
    serializer_class= ToDoSerializer
    permission_class=[IsAuthenticated]

    def get_queryset (self):
        user=self.request.user
        todo_all=toDoList.objects.filter(author=user)
        return todo_all

    def perform_create (self, serializer):
        serializer.save(author=self.request.user)
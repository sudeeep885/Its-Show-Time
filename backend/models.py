from django.db import models

# Create your models here.

# qrmjmhxdrecrwyvstf@twzhhq.online
# 1234567890Abc

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.email


class WatchList(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    media_type_and_id = models.CharField(max_length=50)

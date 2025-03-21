# # models.py
# from django.db import models
# from django.contrib.auth.models import User

# class Doctor(models.Model):
#     """
#     Doctor profile model linked to Django's built-in User model
#     """
#     # This creates a one-to-one relationship between the User model and Doctor model
#     # One user can only have one doctor profile and vice versa
#     # on_delete=models.CASCADE means if the User is deleted, the Doctor profile will also be deleted
#     # related_name='doctor' means we can access the doctor profile from a user instance via user.doctor
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor')
    
#     # CharField defines a string field with a maximum length
#     # blank=True means this field is optional when creating/updating a Doctor
#     hospital = models.CharField(max_length=255, blank=True)
    
#     # Another optional string field for the doctor's specialty
#     specialty = models.CharField(max_length=255, blank=True)
    
#     # Field for the doctor's role with a default value of 'general'
#     # This field will be set to 'general' if no value is provided
#     role = models.CharField(max_length=20, default='general')
    
#     # Optional field for the doctor's license number
#     license_number = models.CharField(max_length=50, blank=True)
    
#     # String representation of the Doctor model
#     # This defines what is displayed when printing a Doctor object
#     def __str__(self):
#         return f"Dr. {self.user.first_name} {self.user.last_name} ({self.user.username})"


# # serializers.py
# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Doctor
# from django.db.utils import IntegrityError
# from rest_framework.exceptions import ValidationError
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.tokens import RefreshToken

# class UserSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the User model
#     Handles conversion between User model instances and Python data types
#     """
#     class Meta:
#         # Specify which model this serializer is for
#         model = User
#         # List of fields to include in the serialized output
#         fields = ('id', 'username', 'email', 'first_name', 'last_name')
#         # Fields that are read-only and cannot be modified via the serializer
#         read_only_fields = ('id',)

# class DoctorProfileSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Doctor model
#     Handles only the Doctor-specific fields (not User fields)
#     """
#     class Meta:
#         model = Doctor
#         # Only include Doctor model fields, not the related User fields
#         fields = ('hospital', 'specialty', 'role', 'license_number')

# class DoctorSignupSerializer(serializers.Serializer):
#     """
#     Custom serializer for user registration
#     Not tied to a specific model - handles creating both User and Doctor models
#     """
#     # Define each field that should be included in the signup form
#     # required=True means the field must be provided
#     username = serializers.CharField(required=True)
#     email = serializers.EmailField(required=True)
#     # write_only=True means this field will be accepted when creating but not included in responses
#     password = serializers.CharField(write_only=True, required=True)
#     # Optional fields
#     first_name = serializers.CharField(required=False)
#     last_name = serializers.CharField(required=False)
    
#     def create(self, validated_data):
#         """
#         Custom create method that creates both a User and associated Doctor
#         """
#         try:
#             # Create a new User instance with the create_user method which handles password hashing
#             user = User.objects.create_user(
#                 username=validated_data['username'],
#                 email=validated_data['email'],
#                 password=validated_data['password'],
#                 # get() with default empty string handles cases where these fields aren't provided
#                 first_name=validated_data.get('first_name', ''),
#                 last_name=validated_data.get('last_name', '')
#             )
            
#             # Create a Doctor profile linked to the new user
#             # Initially empty (will be populated later)
#             Doctor.objects.create(user=user)
            
#             return user
#         except IntegrityError:
#             # This will catch duplicate username errors
#             # Raises a validation error that will be properly formatted in the API response
#             raise ValidationError({"username": "This username is already taken. Please choose another one."})

# class DoctorCompleteSerializer(serializers.ModelSerializer):
#     """
#     Serializer that combines User and Doctor data in a nested structure
#     """
#     # Nested serializer - includes all User fields in the response
#     user = UserSerializer()
    
#     class Meta:
#         model = Doctor
#         # Include the nested user serializer and all Doctor fields
#         fields = ('user', 'hospital', 'specialty', 'role', 'license_number')

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     """
#     Custom JWT token serializer that includes user data in the response
#     Extends the standard JWT token serializer
#     """
#     def validate(self, attrs):
#         # Call the parent validate method to authenticate user and create tokens
#         data = super().validate(attrs)
        
#         # Get the authenticated user (set by parent class)
#         user = self.user
#         try:
#             # Try to get the associated Doctor profile
#             doctor = Doctor.objects.get(user=user)
#             # Add user and doctor data to the response
#             data['user'] = {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'doctor': {
#                     'hospital': doctor.hospital,
#                     'specialty': doctor.specialty,
#                     'role': doctor.role,
#                     'license_number': doctor.license_number
#                 }
#             }
#         except Doctor.DoesNotExist:
#             # If the Doctor profile doesn't exist, create one
#             Doctor.objects.create(user=user)
#             # Add user data with empty doctor fields
#             data['user'] = {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'doctor': {
#                     'hospital': '',
#                     'specialty': '',
#                     'role': 'general',
#                     'license_number': ''
#                 }
#             }
            
#         return data


# # views.py
# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from django.contrib.auth.models import User
# from .models import Doctor
# from .serializers import (
#     DoctorSignupSerializer, 
#     DoctorProfileSerializer, 
#     DoctorCompleteSerializer,
#     CustomTokenObtainPairSerializer
# )
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.tokens import RefreshToken

# class CustomTokenObtainPairView(TokenObtainPairView):
#     """
#     Custom view for obtaining JWT tokens
#     Uses our custom serializer that includes user data in the response
#     """
#     serializer_class = CustomTokenObtainPairSerializer

# class DoctorViewSet(viewsets.ModelViewSet):
#     """
#     ViewSet for Doctor model - handles all CRUD operations plus custom actions
#     """
#     # Base queryset - all Doctor objects
#     queryset = Doctor.objects.all()
    
#     def get_permissions(self):
#         """
#         Define permissions based on the action being performed
#         Returns appropriate permission classes
#         """
#         if self.action == 'signup' or self.action == 'login':
#             # Allow anyone to sign up or log in
#             return [permissions.AllowAny()]
#         elif self.action in ['list', 'retrieve']:
#             # Require authentication to list or view doctors
#             return [permissions.IsAuthenticated()]
#         # Default: require authentication
#         return [permissions.IsAuthenticated()]
    
#     def get_serializer_class(self):
#         """
#         Return different serializers based on the action
#         """
#         if self.action == 'signup':
#             # Use signup serializer for registration
#             return DoctorSignupSerializer
#         elif self.action == 'me' or self.action == 'update_profile':
#             # Use profile serializer for viewing/updating own profile
#             return DoctorProfileSerializer
#         # Default: use complete serializer for all doctor data
#         return DoctorCompleteSerializer
    
#     @action(detail=False, methods=['post'])
#     def signup(self, request):
#         """
#         Custom action for user registration
#         Creates a new User and Doctor profile
#         Returns JWT tokens and user data
#         """
#         # Validate and create user with our custom serializer
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
        
#         # Generate JWT tokens for the new user
#         refresh = RefreshToken.for_user(user)
        
#         # Get the associated Doctor profile
#         doctor = Doctor.objects.get(user=user)
        
#         # Return tokens and user data
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'doctor': {
#                     'hospital': doctor.hospital,
#                     'specialty': doctor.specialty,
#                     'role': doctor.role,
#                     'license_number': doctor.license_number
#                 }
#             }
#         }, status=status.HTTP_201_CREATED)
    
#     @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
#     def me(self, request):
#         """
#         Returns the current user's Doctor profile
#         Requires authentication
#         """
#         # Get Doctor profile for the current user
#         doctor = Doctor.objects.get(user=request.user)
#         serializer = DoctorCompleteSerializer(doctor)
#         return Response(serializer.data)
    
#     @action(detail=False, methods=['put', 'patch'], permission_classes=[IsAuthenticated])
#     def update_profile(self, request):
#         """
#         Updates the current user's Doctor profile
#         Accepts partial updates (only fields that need to be changed)
#         Requires authentication
#         """
#         doctor = Doctor.objects.get(user=request.user)
#         # partial=True allows updating only some fields
#         serializer = DoctorProfileSerializer(doctor, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
        
#         # Return the complete updated profile
#         complete_serializer = DoctorCompleteSerializer(doctor)
#         return Response(complete_serializer.data)


# # urls.py
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import DoctorViewSet, CustomTokenObtainPairView
# from rest_framework_simplejwt.views import TokenRefreshView

# # Create a router for automatic URL routing for the viewset
# router = DefaultRouter()
# # Register the DoctorViewSet with the 'doctors' prefix
# router.register(r'doctors', DoctorViewSet, basename='doctor')

# # Define URL patterns
# urlpatterns = [
#     # Include all URLs from the router
#     path('', include(router.urls)),
#     # JWT token endpoints
#     path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]


# # settings.py additions
# # Add these configurations to your Django settings.py file

# # Configure REST Framework to use JWT authentication
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ),
# }

# # Import timedelta for token lifetime configuration
# from datetime import timedelta

# # JWT settings
# SIMPLE_JWT = {
#     # Access token expires after 1 hour
#     'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
#     # Refresh token expires after 14 days
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
#     # Generate new refresh token when used
#     'ROTATE_REFRESH_TOKENS': True,
#     # Invalidate old refresh tokens when new ones are created
#     'BLACKLIST_AFTER_ROTATION': True,
#     # Don't update last_login time
#     'UPDATE_LAST_LOGIN': False,
#     # JWT encryption algorithm
#     'ALGORITHM': 'HS256',
#     # Key used for signing tokens (use Django's SECRET_KEY)
#     'SIGNING_KEY': 'YOUR_SECRET_KEY',  # Replace with your Django SECRET_KEY
#     'VERIFYING_KEY': None,
#     # HTTP header prefix for Authorization header
#     'AUTH_HEADER_TYPES': ('Bearer',),
#     # User ID field in the User model
#     'USER_ID_FIELD': 'id',
#     # User ID claim in the token payload
#     'USER_ID_CLAIM': 'user_id',
#     # Token class
#     'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
#     # Token type claim in the payload
#     'TOKEN_TYPE_CLAIM': 'token_type',
# }


# # Frontend React API integration (JavaScript)

# // api.js
# import axios from 'axios';

# // Base URL for all API requests
# const baseURL = 'http://localhost:8000';  // Adjust to match your backend URL

# // Create axios instance with common configuration
# const api = axios.create({
#     baseURL,
#     headers: {
#         'Content-Type': 'application/json',
#     },
# });

# // Request interceptor - runs before every request
# // Automatically adds the JWT token to all requests if available
# api.interceptors.request.use(
#     (config) => {
#         // Get token from localStorage
#         const token = localStorage.getItem('access_token');
#         if (token) {
#             // Add Authorization header with Bearer token
#             config.headers['Authorization'] = `Bearer ${token}`;
#         }
#         return config;
#     },
#     (error) => {
#         return Promise.reject(error);
#     }
# );

# // Response interceptor - runs after every response
# // Handles token refresh when access token expires
# api.interceptors.response.use(
#     (response) => {
#         // Pass successful responses through unchanged
#         return response;
#     },
#     async (error) => {
#         const originalRequest = error.config;
        
#         // If error is 401 (Unauthorized) and we haven't tried to refresh yet
#         if (error.response.status === 401 && !originalRequest._retry) {
#             // Mark that we've tried to refresh for this request
#             originalRequest._retry = true;
            
#             try {
#                 // Get refresh token from storage
#                 const refreshToken = localStorage.getItem('refresh_token');
#                 // Send request to refresh token endpoint
#                 const res = await axios.post(`${baseURL}/api/token/refresh/`, {
#                     refresh: refreshToken
#                 });
                
#                 if (res.status === 200) {
#                     // Save the new tokens
#                     localStorage.setItem('access_token', res.data.access);
#                     localStorage.setItem('refresh_token', res.data.refresh);
                    
#                     // Update the Authorization header with new token
#                     originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    
#                     // Retry the original request with the new token
#                     return api(originalRequest);
#                 }
#             } catch (refreshError) {
#                 // If refresh fails, log out the user
#                 localStorage.removeItem('access_token');
#                 localStorage.removeItem('refresh_token');
#                 localStorage.removeItem('user');
                
#                 // Redirect to login page
#                 window.location.href = '/login';
#                 return Promise.reject(refreshError);
#             }
#         }
        
#         // For other errors, pass through
#         return Promise.reject(error);
#     }
# );

# // Auth service - contains all authentication-related API functions
# const authService = {
#     // Register a new user
#     signup: async (userData) => {
#         const response = await api.post('/doctors/signup/', userData);
#         // If successful, save tokens and user data
#         if (response.data.access) {
#             localStorage.setItem('access_token', response.data.access);
#             localStorage.setItem('refresh_token', response.data.refresh);
#             localStorage.setItem('user', JSON.stringify(response.data.user));
#         }
#         return response.data;
#     },
    
#     // Login an existing user
#     login: async (credentials) => {
#         const response = await api.post('/api/token/', credentials);
#         // If successful, save tokens and user data
#         if (response.data.access) {
#             localStorage.setItem('access_token', response.data.access);
#             localStorage.setItem('refresh_token', response.data.refresh);
#             localStorage.setItem('user', JSON.stringify(response.data.user));
#         }
#         return response.data;
#     },
    
#     // Log out the current user (client-side only)
#     logout: () => {
#         // Remove all auth data from localStorage
#         localStorage.removeItem('access_token');
#         localStorage.removeItem('refresh_token');
#         localStorage.removeItem('user');
#     },
    
#     // Get current user data from localStorage
#     getCurrentUser: () => {
#         const userStr = localStorage.getItem('user');
#         if (userStr) return JSON.parse(userStr);
#         return null;
#     },
    
#     // Update doctor profile
#     updateProfile: async (profileData) => {
#         const response = await api.patch('/doctors/update_profile/', profileData);
#         // Update local user data with new profile data
#         const user = authService.getCurrentUser();
#         if (user) {
#             user.doctor = {...user.doctor, ...response.data};
#             localStorage.setItem('user', JSON.stringify(user));
#         }
#         return response.data;
#     },
    
#     // Get current user's complete profile from server
#     getMe: async () => {
#         const response = await api.get('/doctors/me/');
#         return response.data;
#     },
# };

# export { api, authService };
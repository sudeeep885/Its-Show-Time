from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, WatchListViewSerializer
from rest_framework.views import APIView
from .models import WatchList
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class WatchListView(APIView):
    
    serializer_class = WatchListViewSerializer

    def get(self, request, format=None):
        queryset = WatchList.objects.filter(user = request.user)
        if queryset.exists():
            data = self.serializer_class(queryset, many=True)
            return Response(data.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        if request.GET.get('check'):
            queryset = WatchList.objects.filter(user=request.user, media_type_and_id=request.data['media_type_and_id'])
            if queryset.exists():
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)

        else:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        obj = WatchList.objects.get(user=request.user, media_type_and_id=request.data['media_type_and_id'])
        obj.delete()
        return Response(status=status.HTTP_200_OK)
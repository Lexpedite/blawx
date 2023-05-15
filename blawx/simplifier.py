from django.http import Http404, HttpResponseNotFound, HttpResponseForbidden

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, DjangoObjectPermissions, IsAuthenticatedOrReadOnly, AllowAny

import gpt4all

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def simplify(request):
    gptj = gpt4all.GPT4All("ggml-gpt4all-j-v1.3-groovy")
    messages = [{"role": "user", "content": "Simplify the following explanation: " + request.data['explanation'] }]
    return Response(gptj.chat_completion(messages))
from django.http import Http404, HttpResponseNotFound, HttpResponseForbidden

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, DjangoObjectPermissions, IsAuthenticatedOrReadOnly, AllowAny

import openai
import os

prompt_preamble = """
What follows is an automatically generated explanation. Restate it in plain language without restating mathematical calculations and
without further justifying conclusions for which there is only an absence of evidence in support.


"""

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def simplify(request):
    if "OPENAI_API_KEY" in os.environ:
        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt_preamble + request.data['explanation'] }])
        return Response(completion.choices[0].message.content)
    else:
        return Response("")
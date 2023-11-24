from typing import Callable, List
from django.http import HttpRequest, HttpResponseForbidden
from decouple import config, Csv

class CorsMiddleware:
    """
    Middleware for handling Cross-Origin Resource Sharing (CORS) in Django.

    :Attributes:
        get_response: The next middleware or view function in the Django request/response chain.
    """

    def __init__(self, get_response: Callable):
        """
        Initialize the CorsMiddleware.

        :param get_response: The next middleware or view function in the Django request/response chain.
        """
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        """
        Process the incoming request and determine whether to allow or deny access based on CORS settings.

        :param request: The incoming Django HttpRequest object.
        :return: Either a response allowing access or a forbidden response.
        """
        allowed_origin: List[str] = config('CORS_ORIGIN_WHITELIST', cast=Csv())

        if request.headers.get('Origin') not in allowed_origin:
            return HttpResponseForbidden('Access forbidden')

        user_agent: str = request.headers.get('User-Agent', '').lower()
        if 'mozilla' not in user_agent and 'chrome' not in user_agent and 'safari' not in user_agent:
            return HttpResponseForbidden('Access forbidden')

        response: HttpResponseForbidden = self.get_response(request)
        response['Access-Control-Allow-Origin'] = allowed_origin
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

        return response

import base64
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from decouple import config
from rest_framework.renderers import BaseRenderer


class EncryptorRenderer(BaseRenderer):
    """A custom renderer for encrypting and rendering data in an AES-encrypted format."""
    media_type = 'application/octet-stream'
    format = 'aes'

    def render(self, data: dict, media_type: str = None, renderer_context: dict = None) -> str:
        """Render the input data by encrypting it and returning the result as a JSON string.

        :param data: The input data.
        :param media_type: The media type requested by the client.
        :param renderer_context: Additional context for rendering, if needed.
        :returns: A string containing the encrypted data and IV from the cipher in JSON format.
        """
        plaintext = json.dumps(data)
        padded_plaintext = pad(plaintext.encode(), 16)
        key = bytes(config('AES_SECRET_KEY'), 'utf-8')
        cipher = AES.new(key, AES.MODE_CBC)
        ciphertext = cipher.encrypt(padded_plaintext)
        ciphertext_b64 = base64.b64encode(ciphertext).decode()
        iv = base64.b64encode(cipher.iv).decode('utf-8')
        response = {'ciphertext': ciphertext_b64, 'iv': iv}
        return json.dumps(response)

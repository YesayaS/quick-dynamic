import json
import os
import webbrowser
from functools import wraps
import logging
from tkinter.filedialog import askdirectory
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
# import webview

import app

# development only
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# logger.debug(dirs)


templatesDir = os.path.join(os.path.dirname(__name__), "templates")
staticDir = os.path.join(os.path.dirname(__name__), "static")

# if not os.path.exists(gui_dir):  # frozen executable path
#     gui_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gui")

server = Flask(__name__, static_folder=staticDir, template_folder=templatesDir)
CORS(server)
# server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching

# def verify_token(function):
#     @wraps(function)
#     def wrapper(*args, **kwargs):
#         data = json.loads(request.data)
#         token = data.get("token")
#         if token == webview.token:
#             return function(*args, **kwargs)
#         else:
#             raise Exception("Authentication error")

#     return wrapper


# @server.after_request
# def add_header(response):
#     response.headers["Cache-Control"] = "no-store"
#     return response


@server.route("/")
def landing():
    """
    Render index.html. Initialization is performed asynchronously in initialize() function
    """
    return render_template("rename-folders.html")


@server.route("/api/rename_folder", methods=["POST"])
def rename_folder():
    # result = app.rename_folder(request)
    # response = {"status": result}
    return jsonify({"amanjing"})

if __name__ == '__main__':
    server.run(debug=True)
import json
import os
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

import app

templatesDir = os.path.join(os.path.dirname(__name__), "templates")
staticDir = os.path.join(os.path.dirname(__name__), "static")

server = Flask(__name__, static_folder=staticDir, template_folder=templatesDir)
CORS(server)
server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching

@server.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store"
    return response


@server.route("/")
def landing():
    return render_template("rename-folders.html")

@server.route("/rename", methods=["POST"])
def rename_folder():
    status = app.rename_folder(request)
    response = {"status": status}
    return jsonify(response)

if __name__ == '__main__':
    server.run(debug=True)
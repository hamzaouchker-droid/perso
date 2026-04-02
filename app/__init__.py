import os
from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config["UPLOAD_FOLDER"] = os.path.join(app.static_folder, "uploads")
    app.config["GENERATED_FOLDER"] = os.path.join(app.static_folder, "generated")
    app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10 MB max

    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    os.makedirs(app.config["GENERATED_FOLDER"], exist_ok=True)

    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app

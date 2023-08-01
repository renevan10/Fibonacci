from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost/Fibonacci"
db.init_app(app)
app.app_context().push()
CORS(app)


class Sequence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    n = db.Column(db.Integer, nullable=False)
    term = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Sequence: {self.term}"

    def __init__(self, n, term):
        self.n = n
        self.term = term

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
    n = db.Column(db.Integer, nullable=False, unique=True)
    term = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Sequence: {self.term}"

    def __init__(self, n, term):
        self.n = n
        self.term = term


@app.route('/getSequence/<n>', methods=['GET'])
def get_entry(n):
    n = int(n)
    res = []
    for i in range(1, n+1):
        # Check if that sequence exists in db to avoid re-computing
        exists = bool(Sequence.query.filter_by(n=i).first())
        if exists == False:
            # Edge case of n being 1 or 2
            if i == 1 or i == 2:
                sequence = Sequence(i, 1)
                db.session.add(sequence)
                db.session.commit()
                res.append(format_sequence(sequence))
            else:
                num1 = Sequence.query.filter_by(n=i-2).one()
                num2 = Sequence.query.filter_by(n=i-1).one()
                sequence = Sequence(i, num1.term+num2.term)
                db.session.add(sequence)
                db.session.commit()
                res.append(format_sequence(sequence))
        else:
            num = Sequence.query.filter_by(n=i).one()
            res.append(format_sequence(num))
    return {
        "sequence": res
    }


def format_sequence(sequence):
    return {
        "id": sequence.id,
        "n": sequence.n,
        "term": sequence.term,
    }

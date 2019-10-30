from flask import Flask, render_template, request, jsonify, Response
import requests
import json
import logging
import webapp2
import sqlalchemy
import os

db_user = os.environ.get("DB_USER")
db_pass = os.environ.get("DB_PASS")
db_name = os.environ.get("DB_NAME")
cloud_sql_connection_name = os.environ.get("CLOUD_SQL_CONNECTION_NAME")

app = Flask(__name__)

logger = logging.getLogger()

db = sqlalchemy.create_engine(
    # Equivalent URL:
    # mysql+pymysql://<db_user>:<db_pass>@/<db_name>?unix_socket=/cloudsql/<cloud_sql_instance_name>
    sqlalchemy.engine.url.URL(
        drivername='mysql+pymysql',
        username="root",
        password="dbuserdbuser",
        database="colorpairs",
        query={
            'unix_socket': '/cloudsql/{}'.format(gridgame-257423:us-east1:gridgame)
        }
    )
)

@app.route('/', methods=['GET'])
def index():
    votes = []
    with db.connect() as conn:
        # Execute the query and fetch all results
        random_color = conn.execute(
            "SELECT Hex FROM color "
            "LIMIT 1;"
        ).fetchone()

    return render_template(
        'grid.html',
        random_color=str(random_color)
    )

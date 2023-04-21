from flask import Flask, jsonify, request, _request_ctx_stack
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
import json
from functools import wraps
from jose import jwt, JWTError
import requests

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://muhlenkortmatthew:8oHUtdGHobyMNOk8@cluster0.9y6eujl.mongodb.net/Database1?retryWrites=true&w=majority"
app.config["CORS_HEADERS"] = "Content-Type"
app.config["CORS_RESOURCES"] = {
    r"/*": {"origins": ["http://localhost:8080", "dev-znph8s0me1vxsurp.us.auth0.com"]}
}
mongo = PyMongo(app)

@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    return response

AUTH0_DOMAIN = 'dev-znph8s0me1vxsurp.us.auth0.com'
API_AUDIENCE = 'http://localhost'
ALGORITHMS = ['RS256']

def get_public_key(auth0_domain):
    url = f"https://{auth0_domain}/.well-known/jwks.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Could not fetch public key from Auth0 domain.")

def get_token_auth_header():
    auth = request.headers.get("Authorization", None)
    if not auth:
       raise Exception("Authorization header is expected.")

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise Exception("Authorization header must start with 'Bearer'.")
    elif len(parts) == 1:
        raise Exception("Token not found.")
    elif len(parts) > 2:
        raise Exception("Authorization header must be 'Bearer <token>'.")

    token = parts[1]
    return token

def requires_auth(permission=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header()
            try:
                jwks = get_public_key(AUTH0_DOMAIN)
                unverified_header = jwt.get_unverified_header(token)
                if "kid" not in unverified_header:
                    raise Exception("Missing 'kid' field in JWT token header.")
                
                rsa_key = {}
                for key in jwks["keys"]:
                    if key["kid"] == unverified_header["kid"]:
                        rsa_key = {
                            "kty": key["kty"],
                            "kid": key["kid"],
                            "use": key["use"],
                            "n": key["n"],
                            "e": key["e"],
                        }
                payload = jwt.decode(
                    token, rsa_key, algorithms=ALGORITHMS, audience=API_AUDIENCE
                )
            except jwt.ExpiredSignatureError:
                raise Exception("Token is expired.")
            except jwt.JWTClaimsError:
                raise Exception("Incorrect claims, check the audience and issuer.")
            except JWTError as e:
                raise Exception(f"Unable to parse the authentication token: {str(e)}")
            except Exception as e:
                raise Exception(f"Unexpected error: {str(e)}")
            if permission:
                user_permissions = payload.get('permissions', [])
                if permission not in user_permissions:
                    raise Exception("Unauthorized permission.")
            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)

        return decorated
    return decorator

@app.route('/')

def index():
    return "Flask API is running! We brought cake!"

# Create a new task
@app.route('/tasks', methods=['POST'])
@requires_auth(permission="create:tasks")
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    task_id = mongo.db.tasks.insert_one({"title": title, "description": description}).inserted_id
    print(task_id)
    return jsonify({"id": str(task_id), "title": title, "description": description})


# Retrieve all tasks
@app.route('/tasks', methods=['GET'])
@requires_auth(permission="read:tasks")
def get_tasks():
    tasks = mongo.db.tasks.find()
    return dumps(tasks)

# Retrieve a single task
@app.route('/tasks/<task_id>', methods=['GET'])
@requires_auth(permission="read:tasks")
def get_task(task_id):
    task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
    if task:
        result = {"id": str(task["_id"]), "title": task["title"], "description": task["description"]}
    else:
        result = {"msg": "Task not found"}

    return jsonify(result)

# Update a task
@app.route('/tasks/<task_id>', methods=['PUT'])
@requires_auth(permission="update:tasks")
def update_task(task_id):
    task_data = request.json
    task_title = task_data['title']
    task_description = task_data['description']
    task = {"title": task_title, "description": task_description}

    mongo.db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": task})

    return jsonify({"msg": "Task updated successfully"})

# Delete a task
@app.route('/tasks/<task_id>', methods=['DELETE'])
@requires_auth(permission="delete:tasks")
def delete_task(task_id):
    mongo.db.tasks.delete_one({"_id": ObjectId(task_id)})

    return jsonify({"msg": "Task deleted successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
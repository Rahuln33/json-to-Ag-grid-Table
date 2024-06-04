from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    with open(r'c:\Users\elcot\Downloads\final.json') as f:
        data = json.load(f)

    formatted_data = []
    for workspace in data:
        workspace_domain = workspace['workspace_domain']
        no_of_dashboards = len(workspace['dashboards'])
        workspace_name = workspace['workspace_name']
        no_of_reports = len(workspace['reports'])
        no_of_users = len(workspace['users'])
        users = workspace.get('users', [])  # Ensure users list exists

        for user in users:
            formatted_data.append({
                'workspace_domain': workspace_domain,
                'no_of_dashboards': no_of_dashboards,
                'workspace_name': workspace_name,
                'no_of_reports': no_of_reports,
                'no_of_users':no_of_users,
                # 'email': user['email'],
                # 'name': user['name']
            })

    return jsonify(formatted_data)

if __name__ == '__main__':
    app.run(debug=True)

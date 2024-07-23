import os
import json
from flask import Flask, request, jsonify, session, Response, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import time
from langchain_community.chat_models import ChatSparkLLM
from langchain_core.messages import HumanMessage, AIMessage

app = Flask(__name__, static_folder='static')
CORS(app)
app.secret_key = 'your_secret_key'

chat_histories = {}

chat_model = ChatSparkLLM(
    spark_app_id="8ec6da98",
    spark_api_key="905cda25181eecd10ccf47f3c768d22f",
    spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm",
    spark_api_url="wss://spark-api.xf-yun.com/v3.5/chat",
    spark_llm_domain="generalv3.5",
    timeout=90
)


def save_chat_history(username, chat_history):
    os.makedirs("chat_histories", exist_ok=True)
    file_path = f"chat_histories/{username}.json"
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump([message.dict() for message in chat_history], f, ensure_ascii=False, indent=4)


def load_chat_history(username):
    file_path = f"chat_histories/{username}.json"
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
            return [HumanMessage(**msg) if msg['type'] == 'human' else AIMessage(**msg) for msg in messages]
    return []


def os_setenv():
    os.environ["SERPAPI_API_KEY"] = "7c568f6675a4d131a3e98359a6a58a82ed7d752c908f3e4ad9a68f6e443deb15"
    os.environ[
        "USER_AGENT"] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0"


@app.route('/')
def index():
    return "Hello, World!"


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    if not user or not check_password_hash(user[0], password):
        return jsonify({"message": "用户名或密码错误"}), 401

    session['username'] = username
    chat_histories[username] = load_chat_history(username)  # 加载聊天记录
    return jsonify({"message": "登录成功"}), 200


@app.route('/ask', methods=['POST'])
def ask():
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    user_message = request.json.get('question')

    if username not in chat_histories:
        chat_histories[username] = []

    chat_histories[username].append(HumanMessage(content=user_message))

    def generate():
        ai_message = get_qa_chain(username, user_message)
        for char in ai_message:
            yield char
            time.sleep(0.05)  # 模拟逐字输出

    # 将AI响应添加到历史记录
    ai_message = get_qa_chain(username, user_message)
    chat_histories[username].append(AIMessage(content=ai_message))

    # 保存聊天记录到文件
    save_chat_history(username, chat_histories[username])

    return Response(generate(), mimetype='text/event-stream')


@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)


def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='your_password',
        database='your_database'
    )
    return connection


if __name__ == '__main__':
    os_setenv()  # 设置环境变量
    app.run(debug=True)

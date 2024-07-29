from flask import Flask, request, jsonify, send_from_directory, session, Response
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import secrets
from werkzeug.utils import secure_filename
import os
import time
import webbrowser
from langchain_community.chat_models import ChatSparkLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_community.document_loaders import WebBaseLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores import Qdrant
from langchain.chains import create_retrieval_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder, ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage, AIMessage
from langchain.agents import create_react_agent, AgentExecutor
from langchain.agents import initialize_agent
from langchain.tools import Tool
from langchain import hub
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain.prompts.chat import (
    ChatPromptTemplate,
    ChatMessagePromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain.schema import (
    AIMessage,
    SystemMessage,
    HumanMessage
)

app = Flask(__name__, static_folder='static')
CORS(app)


################################# retrieval chain #################################

def os_setenv():
    """
    设置环境变量
    """
    os.environ["SERPAPI_API_KEY"] = "7c568f6675a4d131a3e98359a6a58a82ed7d752c908f3e4ad9a68f6e443deb15"
    os.environ[
        "USER_AGENT"] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0"


def get_spark_chat_model():
    """
    获取Spark聊天模型
    :return: ChatSparkLLM对象
    """
    chat_model_spark = ChatSparkLLM(
        spark_app_id="8ec6da98",
        spark_api_key="905cda25181eecd10ccf47f3c768d22f",
        spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm",
        spark_api_url="wss://spark-api.xf-yun.com/v3.5/chat",
        spark_llm_domain="generalv3.5",
        timeout=90,
        streaming=True
    )

    return chat_model_spark

import json
def load_historynum():
    """
    加载历史会话编号
    :return: 历史会话编号字典
    """
    try:
        with open('historynum.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

historynum = load_historynum()

def create_chat_history(username):
    # 获取当前用户的最大 historynum
    if username in chat_histories:
        max_history_num = max(chat_histories[username].keys(), default=-1)
        historynum[username] = max_history_num + 1
    else:
        historynum[username] = 0
        chat_histories[username] = {}

    # 确保创建新的聊天历史列表
    chat_histories[username][historynum[username]] = []

    save_chat_history(username, chat_histories[username][historynum[username]])


def save_chat_history(username, chat_history):
    """
    保存聊天历史记录
    :param username: 用户名
    :param chat_history: 聊天历史记录
    """
    current_historynum = historynum.get(username, 0)
    file_path = f"chat_history/{username}_{current_historynum}.json"
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump([message.dict() for message in chat_history], f, ensure_ascii=False, indent=4)

    # 保存 historynum
    with open('historynum.json', 'w', encoding='utf-8') as f:
        json.dump({username: current_historynum for username, current_historynum in historynum.items()}, f, ensure_ascii=False, indent=4)

def load_all_histories():
    # 初始化全局聊天历史和最大 historynum
    global chat_histories, historynum
    chat_histories = {}
    historynum = {}

    # 遍历 chat_history 文件夹中的所有文件
    for filename in os.listdir('chat_history'):
        # 检查文件名是否符合格式
        if "_" in filename and filename.endswith(".json"):
            try:
                # 提取用户名和 historynum
                username, history_num_str = filename.split('_')
                history_num = int(history_num_str[:-5])

                # 初始化该用户的聊天历史
                if username not in chat_histories:
                    chat_histories[username] = {}
                    historynum[username] = -1
                historynum[username] = max(historynum[username], history_num)
                # 加载聊天记录
                with open(os.path.join('chat_history', filename), 'r', encoding='utf-8') as f:
                    messages = json.load(f)
                    chat_histories[username][history_num] = [
                        HumanMessage(**msg) if msg['type'] == 'human' else AIMessage(**msg)
                        for msg in messages
                    ]
            except (ValueError, json.JSONDecodeError):
                # 忽略无法解析的文件
                continue




def load_chat_history(username, history_num=None):
    """
    加载聊天历史记录
    :param username: 用户名
    :param history_num: 历史会话编号
    :return: 聊天历史记录列表
    """
    if history_num is None:
        history_num = historynum.get(username, 0)

    historynum[username] = history_num

    file_path = f"chat_history/{username}_{history_num}.json"

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
            return [HumanMessage(**msg) if msg['type'] == 'human' else AIMessage(**msg) for msg in messages]
    return []

def rearrange_chat_histories(username):
    if username not in chat_histories:
        return

    # 获取当前用户的所有聊天历史
    histories = chat_histories[username]

    # 重新排列 historynum
    new_histories = {}
    for new_num, (old_num, history) in enumerate(sorted(histories.items())):
        new_histories[new_num] = history
        # 重命名文件
        old_file_path = f"chat_history/{username}_{old_num}.json"
        new_file_path = f"chat_history/{username}_{new_num}.json"
        if os.path.exists(old_file_path):
            os.rename(old_file_path, new_file_path)

    # 更新 chat_histories 和 historynum
    chat_histories[username] = new_histories
    historynum[username] = len(new_histories) - 1

    # 保存 historynum
    with open('historynum.json', 'w', encoding='utf-8') as f:
        json.dump(historynum, f, ensure_ascii=False, indent=4)

def get_vectordb():
    """
    获取向量数据库
    :return: 向量数据库对象
    """
    from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
    # 遍历文件夹，加载所有文档
    base_dir = "doc"
    documents = []
    for filename in os.listdir(base_dir):
        file_path = os.path.join(base_dir, filename)
        if os.path.getsize(file_path) > 0:
            if filename.endswith(".pdf"):
                loader = PyPDFLoader(file_path)
                documents.extend(loader.load())
            elif filename.endswith(".docx"):
                loader = Docx2txtLoader(file_path)
                documents.extend(loader.load())
            elif filename.endswith(".txt"):
                loader = TextLoader(file_path, encoding='utf-8')
                documents.extend(loader.load())

    # 文本分割
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=10)
    chunked_documents = text_splitter.split_documents(documents=documents)

    # 嵌入模型
    EMBEDDING_DEVICE = "cpu"
    embeddings = HuggingFaceEmbeddings(model_name="C:/Users/Lenovo/Desktop/workspace/pythonProject/langchain-first/models/m3e-base",
                                       model_kwargs={'device': EMBEDDING_DEVICE})
    # 创建向量数据库
    vectorstore = Qdrant.from_documents(
        documents=chunked_documents,
        embedding=embeddings,
        location=":memory:",
        collection_name="my_documents",
    )
    return vectorstore

def get_qa_chain(username, user_message):
    """
    获取问答链
    :param username: 用户名
    :param user_message: 用户消息
    :return: AI响应
    """
    retriever = get_vectordb().as_retriever()
    os_setenv()
    chat_model = get_spark_chat_model()

    prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are a helpful AI assistant. Use the following conversation history and the user's input to create a search query to find relevant information to answer the user's question."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])
    retrieval_chain = create_history_aware_retriever(chat_model, retriever, prompt)

    combine_prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are a helpful AI assistant. Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\nContext: {context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ])
    combine_docs_chain = create_stuff_documents_chain(chat_model, combine_prompt)

    conversation_chain = create_retrieval_chain(retrieval_chain, combine_docs_chain)

    response = conversation_chain.invoke({
        "chat_history": chat_histories[username][historynum[username]],
        "input": user_message,
        "question": user_message
    })

    return response["answer"]


################################# End #################################


################################# Config for webUI #################################

# MySQL数据库配置
db_config = {
    'user': 'test',
    'password': 'oneplusone',
    'host': 'localhost',
    'database': 'practice'
}


def get_db_connection():
    """
    获取数据库连接
    :return: 数据库连接对象
    """
    connection = mysql.connector.connect(**db_config)
    return connection


@app.route('/')
def index():
    """
    返回主页
    :return: 主页HTML
    """
    return send_from_directory(app.static_folder, 'index.html')


app.secret_key = secrets.token_hex(16)


@app.route('/register', methods=['POST'])
def register():
    """
    用户注册
    :return: 注册结果
    """
    username = request.json.get('username')
    password = request.json.get('password')
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        return jsonify({"message": "用户已存在"}), 400

    password_hash = generate_password_hash(password)
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password_hash))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "注册成功"}), 201

@app.route('/login', methods=['POST'])
def login():
    """
    用户登录
    :return: 登录结果
    """
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
    load_all_histories()
    if username not in chat_histories:
        chat_histories[username] = {}
        historynum[username] = 0
        chat_histories[username][historynum[username]] = []

    current_historynum = historynum.get(username, 0)

    chat_histories[username][current_historynum] = load_chat_history(username,current_historynum)  # 加载聊天记录
    return jsonify({"message": "登录成功"}), 200

@app.route('/logout')
def logout():
    """
    用户登出
    :return: 登出结果
    """
    session.pop('username', None)
    return jsonify({"message": "已登出"}), 200


@app.route('/ask', methods=['POST'])
def ask():
    """
    提问接口
    :return: AI响应
    """
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    user_message = request.json.get('question')
    current_historynum = historynum.get(username, 0)
    chat_histories[username][current_historynum].append(HumanMessage(content=user_message))

    def generate():
        response = get_qa_chain(username, user_message)
        chat_histories[username][current_historynum].append(AIMessage(content=response))
        save_chat_history(username, chat_histories[username][current_historynum])
        yield response

    return Response(generate(), mimetype='text/event-stream')


UPLOAD_FOLDER = './doc'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    """
    检查文件扩展名是否允许
    :param filename: 文件名
    :return: 是否允许
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    """
    文件上传接口
    :return: 上传结果
    """
    if 'files' not in request.files:
        return jsonify({"message": "No file part"}), 400
    files = request.files.getlist('files')
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            return jsonify({"message": "Invalid file type"}), 400
    return jsonify({"message": "Files uploaded successfully"}), 200

@app.route('/get_chat_history', methods=['GET'])
def get_chat_history():
    """
    获取聊天历史记录
    :return: 聊天历史记录
    """
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    current_historynum = historynum.get(username, 0)
    chat_history = load_chat_history(username,current_historynum)
    history_with_sender = [{"sender": "ai" if isinstance(message, AIMessage) else "user", "content": message.content} for message in chat_history]
    return jsonify({"chat_history": history_with_sender}), 200

@app.route('/delete_conversation', methods=['POST'])
def delete_conversation():
    """
    清除聊天历史记录
    :return: 清除结果
    """
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    index = request.json.get('history_num')
    username = session['username']
    current_historynum = historynum.get(username, index)

    if username in chat_histories and current_historynum in chat_histories[username]:
        chat_histories[username][current_historynum] = []

    file_path = f"chat_history/{username}_{current_historynum}.json"
    if os.path.exists(file_path):
        os.remove(file_path)
    rearrange_chat_histories(username)
    return jsonify({"message": "Chat history cleared"}), 200

@app.route('/new_conversation', methods=['POST'])
def new_conversation():
    """
    创建新会话
    :return: 新会话结果
    """
    username = session.get('username')
    if not username:
        return jsonify({"message": "User not logged in"}), 401
    
    create_chat_history(username)
    return jsonify({"message": "New conversation created", "history_num": historynum[username]}), 200


@app.route('/switch_conversation', methods=['POST'])
def switch_conversation():
    username = session.get('username')
    if not username:
        return jsonify({"message": "User not logged in"}), 401

    history_num = request.json.get('history_num')
    chat_history = load_chat_history(username, history_num)
    chat_history_dicts = [
        {"type": "HumanMessage", "content": message.content} if isinstance(message, HumanMessage)
        else {"type": "AIMessage", "content": message.content}
        for message in chat_history
    ]
    return jsonify({"message": "Conversation switched", "chat_history": chat_history_dicts}), 200


@app.route('/get_conversations', methods=['GET'])
def get_conversations():
    username = session.get('username')
    if not username:
        return jsonify({"message": "User not logged in"}), 401

    conversations = list(range(historynum[username] + 1))
    return jsonify({"conversations": conversations}), 200


if __name__ == '__main__':
    app.run(debug=True)

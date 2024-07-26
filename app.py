
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
    os.environ["SERPAPI_API_KEY"] = "7c568f6675a4d131a3e98359a6a58a82ed7d752c908f3e4ad9a68f6e443deb15"
    os.environ[
        "USER_AGENT"] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0"


def get_spark_chat_model():
    from langchain_community.chat_models import ChatSparkLLM
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
chat_histories = {}
def load_historynum():
    try:
        with open('historynum.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

historynum = load_historynum()


def create_chat_history(username):

    if username not in historynum:
        historynum[username] = 0
        chat_histories[username][historynum[username]] = []
    if username not in chat_histories:
        chat_histories[username] = {}



def save_chat_history(username, chat_history):
    # 保存聊天记录
    file_path = f"chat_history/{username}_{historynum[username]}.json"
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump([message.dict() for message in chat_history], f, ensure_ascii=False, indent=4)

    # 保存 historynum
    with open('historynum.json', 'w', encoding='utf-8') as f:
        json.dump(historynum, f, ensure_ascii=False, indent=4)

def load_chat_history(username, history_num=None):
    if history_num is None:
        history_num = historynum.get(username, 0)

    historynum[username] = history_num

    file_path = f"chat_history/{username}_{history_num}.json"

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
            return [HumanMessage(**msg) if msg['type'] == 'human' else AIMessage(**msg) for msg in messages]
    return []



def get_vectordb():
    from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
    # 1-1. 遍历文件夹，逐一加载并累加所有的各类文档
    base_dir = "doc"  # do not change the path
    documents = []  # 声明 文档列表，以保存所有的加载的文档
    # 开始遍历指定文件夹
    for filename in os.listdir(base_dir):
        file_path = os.path.join(base_dir, filename)
        if os.path.getsize(file_path) > 0:
            if filename.endswith(".pdf"):
                loader = PyPDFLoader(file_path)
                # documents.append(loader)
                documents.extend(loader.load())
            elif filename.endswith(".docx"):
                loader = Docx2txtLoader(file_path)
                documents.extend(loader.load())
            elif filename.endswith(".txt"):
                loader = TextLoader(file_path, encoding='utf-8')
                documents.extend(loader.load())

    from langchain.text_splitter import RecursiveCharacterTextSplitter
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=10)
    chunked_documents = text_splitter.split_documents(documents=documents)

    from langchain_huggingface import HuggingFaceEmbeddings
    # 指定运算|计算设备
    EMBEDDING_DEVICE = "cpu"
    #/home/vivy/ai/m3e-base;


    embeddings = HuggingFaceEmbeddings(model_name="C:/Users/Lenovo/Desktop/workspace/pythonProject/langchain-first/models/m3e-base",
                                       model_kwargs={'device': EMBEDDING_DEVICE})
    from langchain_community.vectorstores import Qdrant
    vectorstore = Qdrant.from_documents(
        documents=chunked_documents,  # 已经分块的文档
        embedding=embeddings,  # 指定 embedding 模型
        location=":memory:",  # 指定 in-memory 存储
        collection_name="my_documents",  # 指定 类似 数据库的 名称
    )
    return vectorstore

def get_qa_chain(username, user_message):
    retriever = get_vectordb().as_retriever()
    os_setenv()
    chat_model = get_spark_chat_model()
    from langchain.retrievers.multi_query import MultiQueryRetriever  # MultiQueryRetriever工具
    from langchain.chains import RetrievalQA  # RetrievalQA链

    prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are a helpful AI assistant. Use the following conversation history and the user's input to create a search query to find relevant information to answer the user's question."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])
    retrieval_chain = create_history_aware_retriever(chat_model, retriever, prompt)
    # 创建组合文档链
    combine_prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are a helpful AI assistant. Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\nContext: {context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ])
    combine_docs_chain = create_stuff_documents_chain(chat_model, combine_prompt)

    # 创建检索链
    conversation_chain = create_retrieval_chain(retrieval_chain, combine_docs_chain)
    # 实例化一个RetrievalQA链

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
    connection = mysql.connector.connect(**db_config)
    return connection


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


app.secret_key = secrets.token_hex(16)



@app.route('/register', methods=['POST'])
def register():
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

    if username not in chat_histories:
        chat_histories[username] = {}
        create_chat_history(username)
    elif historynum[username] not in chat_histories[username]:
        create_chat_history(username)

    current_historynum = historynum.get(username, 0)
    chat_histories[username][current_historynum] = load_chat_history(username,current_historynum)  # 加载聊天记录
    return jsonify({"message": "登录成功"}), 200

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({"message": "已登出"}), 200


@app.route('/ask', methods=['POST'])
def ask():
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    user_message = request.json.get('question')

    chat_histories[username][historynum[username]].append(HumanMessage(content=user_message))

    """def generate():
        ai_message = get_qa_chain(username, user_message)
        for char in ai_message:
            yield char
            time.sleep(0.05)
        chat_histories[username][historynum[username]].append(AIMessage(content=ai_message))
        save_chat_history(username, chat_histories[username][historynum[username]])"""
    def generate():
        response = get_qa_chain(username, user_message)
        chat_histories[username][historynum[username]].append(AIMessage(content=response))
        save_chat_history(username, chat_histories[username][historynum[username]])
        yield response

    return Response(generate(), mimetype='text/event-stream')



UPLOAD_FOLDER = './doc'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
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
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    current_historynum = historynum.get(username, 0)
    chat_history = load_chat_history(username,current_historynum)
    history_with_sender = [{"sender": "ai" if isinstance(message, AIMessage) else "user", "content": message.content} for message in chat_history]
    return jsonify({"chat_history": history_with_sender}), 200

@app.route('/clear_chat_history', methods=['POST'])
def clear_chat_history():
    if 'username' not in session:
        return jsonify({"message": "请先登录"}), 401

    username = session['username']
    current_historynum = historynum.get(username, 0)

    # Clear the chat history in memory
    if username in chat_histories and current_historynum in chat_histories[username]:
        chat_histories[username][current_historynum] = []

    # Clear the chat history file
    file_path = f"chat_history/{username}_{current_historynum}.json"
    if os.path.exists(file_path):
        os.remove(file_path)

    return jsonify({"message": "Chat history cleared"}), 200

@app.route('/new_conversation', methods=['POST'])
def new_conversation():
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

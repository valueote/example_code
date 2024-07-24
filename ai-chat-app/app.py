
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

from flask import Flask, request, jsonify, send_from_directory, session, Response
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import secrets
from werkzeug.utils import secure_filename
import os
import time
import json

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app, supports_credentials=True)  # 允许跨域请求并支持会话

# Chat model config
chat_model = ChatSparkLLM(
    spark_app_id="8ec6da98",
    spark_api_key="905cda25181eecd10ccf47f3c768d22f",
    spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm",
    spark_api_url="wss://spark-api.xf-yun.com/v3.5/chat",
    spark_llm_domain="generalv3.5",
    timeout=90
)

################################# retrieval chain #################################

def os_setenv():
    os.environ["SERPAPI_API_KEY"] = "7c568f6675a4d131a3e98359a6a58a82ed7d752c908f3e4ad9a68f6e443deb15"
    os.environ["USER_AGENT"] = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0"

def get_spark_chat_model():
    from langchain_community.chat_models import ChatSparkLLM
    chat_model_spark = ChatSparkLLM(
        spark_app_id="8ec6da98",
        spark_api_key="905cda25181eecd10ccf47f3c768d22f",
        spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm",
        spark_api_url="wss://spark-api.xf-yun.com/v3.5/chat",
        spark_llm_domain="generalv3.5",
        timeout=90
    )
    return chat_model_spark

def save_chat_history(username, chat_history):
    file_path = f"chat_history/{username}.json"
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump([message.dict() for message in chat_history], f, ensure_ascii=False, indent=4)

def load_chat_history(username):
    file_path = f"chat_history/{username}.json"
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
            return [HumanMessage(**msg) if msg['type'] == 'human' else AIMessage(**msg) for msg in messages]
    return []

def get_vectordb():
    from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
    base_dir = "doc"
    documents = []
    for filename in os.listdir(base_dir):
        file_path = os.path.join(base_dir, filename)
        if filename.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
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
    EMBEDDING_DEVICE = "cpu"
    embeddings = HuggingFaceEmbeddings(model_name="/home/vivy/ai/m3e-base", model_kwargs={'device': EMBEDDING_DEVICE})
    from langchain_community.vectorstores import Qdrant
    vectorstore = Qdrant.from_documents(
        documents=chunked_documents,
        embedding=embeddings,
        location=":memory:",
        collection_name="my_documents",
    )
    return vectorstore

def get_qa_chain(username, user_message):
    retriever = get_vectordb().as_retriever()
    os_setenv()
    chat_model = get_spark_chat_model()
    from langchain.retrievers.multi_query import MultiQueryRetriever
    from langchain.chains import RetrievalQA
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful AI assistant. Use the following conversation history and the user's input to create a search query to find relevant information to answer the user's question."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])
    retrieval_chain = create_history_aware_retriever(chat_model, retriever, prompt)
    combine_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful AI assistant. Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\nContext: {context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ])
    combine_docs_chain = create_stuff_documents_chain(chat_model, combine_prompt)
    conversation_chain = create_retrieval_chain(retrieval_chain, combine_docs_chain)
    response = conversation_chain.invoke({
        "chat_history": chat_histories[username],
        "input": user_message,
        "question": user_message
    })
    return response["answer"]

################################# End #################################

################################# Config for webUI #################################
from flask import Flask, send_from_directory, session, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import secrets

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app, supports_credentials=True)

# MySQL database configuration
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
    return jsonify({"message": "登录成功"}), 200

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({"message": "已登出"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

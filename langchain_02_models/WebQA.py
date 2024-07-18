import os


from langchain_core.messages import AIMessage
from qdrant_client import QdrantClient
from langchain_openai import ChatOpenAI

# langchain API https://python.langchain.com/v0.2/docs/integrations/chat/openai/
chat_model_openai = ChatOpenAI(
    # openai API https://platform.openai.com/docs/models
    # model="gpt-4o",
    api_key="sk-proj-jPaxmCiqK2xozpoGMGbhT3BlbkFJjAj4MwLrOf0TQi9HljFI",
    model="gpt-3.5-turbo",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

chat_mode = chat_model_openai
# 1. 数据载入
# 1-0. 导入包：各种文档的加载器
'''
    pip install pypdf
    pip instal docx2txt
    pip install txtloader ?
'''
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
# 1-1. 遍历文件夹，逐一加载并累加所有的各类文档
base_dir = "/home/vivy/home-archive/learn2prog/00_hello"     # 所有文档的存放目录
documents = []                  # 声明 文档列表，以保存所有的加载的文档
# 开始遍历指定文件夹
for filename in os.listdir(base_dir):
    # 构建完成的文件名（含有路径信息）
    file_path = os.path.join(base_dir, filename)
    '''
        扩展：通过读取文件的头部信息，获取文件的真实类型
    '''
    # 分别使用不同的加载器加载各类不同的文档
    if filename.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
        # documents.append(loader)
        documents.extend(loader.load())
    elif filename.endswith(".docx"):
        loader = Docx2txtLoader(file_path)
        documents.extend(loader.load())
    elif filename.endswith(".txt"):
        loader = TextLoader(file_path)
        documents.extend(loader.load())

# 2. 文档（文本）切分/分割
# 2-0. 导入 字符文本切分器
from langchain.text_splitter import RecursiveCharacterTextSplitter
# 2-1. 生成|实例化 字符文本器的实例对象
# 指定：切分文档块的大小、重叠词/Token数
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=10)
# 完成文档切分
chunked_documents = text_splitter.split_documents(documents=documents)

# 3. 向量数据库存储
# Storage：将切分的文档进行向量化后 嵌入(embed)向量数据库中
# 选：Embedding： m3e
# 选：VecDB： FAISS、Qdrant
# 3-0. 生成 embedding 模型
# 导包
from langchain_huggingface import HuggingFaceEmbeddings
# 指定运算|计算设备
EMBEDDING_DEVICE = "cpu"
# 生成|实例化 embedding model
embeddings = HuggingFaceEmbeddings(model_name="/home/vivy/ai/m3e-base",
                                   model_kwargs={'device': EMBEDDING_DEVICE})
# 3-1. embedding 到 vectordb 中
'''
    pip install qdrant-client
'''
# 导包
# from langchain.vectorstores import Qdrant
from langchain_community.vectorstores import Qdrant
# 将切分的文档embedding到qdrant
vectorstore = Qdrant.from_documents(
    documents=chunked_documents,        # 已经分块的文档
    embedding=embeddings,              # 指定 embedding 模型
    location=":memory:",                # 指定 in-memory 存储
    collection_name="my_documents",     # 指定 类似 数据库的 名称
)

# 4. 创建 Retrieval 模型/链
# 4-1. 生成 llm chat_model
# 导包，baidu qianfan
from langchain_community.chat_models import QianfanChatEndpoint
# 生成 baiduqianfan chat_model
# completion = chat_mode.invoke(input="介绍下自己")
# print(completion.response_metadata['usage'])

# 4-2. 生成 Retriever
from langchain.retrievers.multi_query import MultiQueryRetriever # MultiQueryRetriever工具
from langchain.chains import RetrievalQA # RetrievalQA链
# 实例化一个MultiQueryRetriever
retriever_from_llm = MultiQueryRetriever.from_llm(retriever=vectorstore.as_retriever(), llm=chat_mode)

# 实例化一个RetrievalQA链
qa_chain = RetrievalQA.from_chain_type(chat_mode,retriever=retriever_from_llm)

#
#
# # 导包
# from langchain.retrievers.multi_query import MultiQueryRetriever
# # 生成|构建 MultiQueryRetriever 实例对象
# retriever = vectorstore.as_retriever()
# # chat_model 绑定
# retriever_from_llm = MultiQueryRetriever.from_llm(llm=chat_mode, retriever=retriever)
# # 导包
# from langchain.chains.retrieval_qa.base import RetrievalQA
# # 生成 QA chain
# qa_chain=RetrievalQA(retriever_from_llm=chat_mode, retriever=retriever_from_llm)


# 5. 生成 WebUI QA
'''
5.1 搭建 flask 框架项目
  模块的安装
     pip install flask
  项目框架的搭建
    static : web project 所有静态资源(pic、js、css...)
    template : web project 模板（含有 scriptlet 脚本的 html）
  完成 后端 Python 代码 和前端 html 模板的 织入（route+data）
     前端 => 后端
        跳转的目的
        携带的数据
     后端 => 前端
        什么情况下跳转到那个 html 模板
        同时带着什么数据
'''
#　导包
from flask import Flask, render_template, request
app = Flask(__name__)   # 使用 Flask App
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 获取用户提交的名为 question 的表单域中的文本数据
        question = request.form.get('question')
        # RAChain 回答问题
        result = qa_chain({"query": question})
        # 带着问题跳转会指定的 html 模板，同时完成渲染
        return render_template("index.html", result=result)

    # 如果是 GET 方式访问，直接返回 index.html（渲染返回）
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
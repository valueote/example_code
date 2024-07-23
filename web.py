# pip install streamlit
# https://docs.streamlit.io/get-started
import logging
import sys

import streamlit as st
import os

from langchain.chains.retrieval_qa.base import RetrievalQA
from langchain_core.prompts import PromptTemplate


def os_setenv():
    # 设置各种 LLM 的 Aks&Sks
    # FREE OpenAI https://github.com/chatanywhere/GPT_API_free
    os.environ["OPENAI_API_KEY"] =\
        "sk-NzFPhk6KmbRwrF7uwXKclG4eiyB2dOr4Fby1HMgossbs35yl"
    os.environ["OPENAI_API_BASE"] =\
        "https://api.chatanywhere.tech/v1"

    # Baidu Wenxin/Qianfan
    os.environ["QIANFAN_AK"] = "DUa7AxoFipunkzDgg0vYC2W3"
    os.environ["QIANFAN_SK"] = "nbgocvuGxoX2Bt7wfcSoDIPaWrKdqk5D"

    # Sparkllm
    os.environ["IFLYTEK_SPARK_APP_ID"] = "1a2c0e22"
    os.environ["IFLYTEK_SPARK_API_KEY"] = "91ac602cffda5c10bbb78fc314f8525d"
    os.environ["IFLYTEK_SPARK_API_SECRET"] = "ODYyMWEzMDViNGVjMWZjYWQyMmE5YWJi"
    # 　此处参考：https://www.xfyun.cn/doc/spark/Web.html
    os.environ["IFLYTEK_SPARK_API_URL"] = "wss://spark-api.xf-yun.com/v3.1/chat"
    os.environ["IFLYTEK_SPARK_llm_DOMAIN"] = "generalv3"

    # Zhipuai
    os.environ["ZHIPUAI_API_KEY"] = "797adc768c5c539b55652fd2beedb2ba.Kkz97HDUo0bx4bPv"

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

def get_vectordb():
    from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
    # 1-1. 遍历文件夹，逐一加载并累加所有的各类文档
    base_dir = "/home/vivy/ai/practice/example_code/doc"  # 所有文档的存放目录
    documents = []  # 声明 文档列表，以保存所有的加载的文档
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

    from langchain_huggingface import HuggingFaceEmbeddings
    # 指定运算|计算设备
    EMBEDDING_DEVICE = "cpu"
    # 生成|实例化 embedding model
    embeddings = HuggingFaceEmbeddings(model_name="/home/vivy/ai/m3e-base",
                                       model_kwargs={'device': EMBEDDING_DEVICE})
    from langchain_community.vectorstores import Qdrant
    # 将切分的文档embedding到qdrant
    vectorstore = Qdrant.from_documents(
        documents=chunked_documents,        # 已经分块的文档
        embedding=embeddings,              # 指定 embedding 模型
        location=":memory:",                # 指定 in-memory 存储
        collection_name="my_documents",     # 指定 类似 数据库的 名称
    )
    return vectorstore

def get_qa_chain(question:str):
    vectorstore = get_vectordb()
    os_setenv()
    chat_mode = get_spark_chat_model()
    from langchain.retrievers.multi_query import MultiQueryRetriever  # MultiQueryRetriever工具
    from langchain.chains import RetrievalQA  # RetrievalQA链
    # 实例化一个MultiQueryRetriever
    retriever_from_llm = MultiQueryRetriever.from_llm(retriever=vectorstore.as_retriever(), llm=chat_mode)

    # 实例化一个RetrievalQA链
    qa_chain = RetrievalQA.from_chain_type(chat_mode, retriever=retriever_from_llm)

    result = qa_chain({"query": question})

    return result["result"]


# 界面
def main():
    st.title('Web QA')
    selected_mothod = st.radio(
        label="",
        options=["chat_qa_chain"],
        captions=["带历史记录的检索问答模式"])
    # 用于跟踪对话历史
    if 'messages' not in st.session_state:
        st.session_state.messages = []
    messages = st.container(height=300)
    if prompt := st.chat_input("Say something"):
        #st.write(prompt)
        # 将用户输入添加到对话历史中
        st.session_state.messages.append(prompt)

        if selected_mothod == "chat_qa_chain":
            answer = get_qa_chain(prompt)
            st.write(answer)
            # 检查回答是否为 None
            if answer is not None:
                # 将LLM的回答添加到对话历史中
                st.session_state.messages.append(answer)

if __name__ == '__main__':
    # answer = get_qa_chain("我们的理想是？")
    # print(answer)
    main()
    # sys.argv = ["streamlit", "run", "web.py"]
    # sys.exit(stcli.main())


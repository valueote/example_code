from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import os
from concurrent.futures import ThreadPoolExecutor
import time


def load_document(file_path):
    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith(".docx"):
        loader = Docx2txtLoader(file_path)
    elif file_path.endswith(".txt"):
        loader = TextLoader(file_path, encoding='utf-8')
    elif file_path.endswith(".py") or file_path.endswith(".cpp") or file_path.endswith(".java"):
        loader = TextLoader(file_path, encoding='utf-8')
    return loader.load()


def build_and_save_vectordb():
    base_dir = "doc"
    file_paths = [os.path.join(base_dir, filename) for filename in os.listdir(base_dir) if
                  os.path.getsize(os.path.join(base_dir, filename)) > 0]

    documents = []
    start_time = time.time()

    def print_elapsed_time():
        while True:
            elapsed_time = time.time() - start_time
            print(f"Elapsed time: {elapsed_time:.2f} seconds")
            time.sleep(10)  # Print every 10 seconds

    import threading
    timer_thread = threading.Thread(target=print_elapsed_time, daemon=True)
    timer_thread.start()

    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(load_document, file_path) for file_path in file_paths]
        for future in futures:
            documents.extend(future.result())

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)
    chunked_documents = text_splitter.split_documents(documents=documents)

    EMBEDDING_DEVICE = "cpu"
    embeddings = HuggingFaceEmbeddings(
        model_name="C:/Users/Lenovo/Desktop/workspace/pythonProject/langchain-first/models/m3e-base",
        model_kwargs={'device': EMBEDDING_DEVICE})

    vectorstore = FAISS.from_documents(
        documents=chunked_documents,
        embedding=embeddings
    )

    vectorstore.save_local("vectorstore")


build_and_save_vectordb()
print("finish!")
#set env variable
import os
os.environ["SERPAPI_API_KEY"] = "7c568f6675a4d131a3e98359a6a58a82ed7d752c908f3e4ad9a68f6e443deb15"
os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0"
#import langchain
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

#chat model config
chat_model = ChatSparkLLM(
    spark_app_id="8ec6da98",
    spark_api_key="905cda25181eecd10ccf47f3c768d22f",
    spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm",
    spark_api_url="wss://spark-api.xf-yun.com/v3.5/chat",
    spark_llm_domain="generalv3.5",
    timeout=90
)

################# retrieval chain #################

# load website
loader = WebBaseLoader(
    web_path=
    "https://web.stanford.edu/class/cs106l/index.html"
)
# load website into Document
docs = loader.load()

EMBEDDING_DEVICE = "cpu"
embeddings = HuggingFaceEmbeddings(model_name="/home/vivy/ai/m3e-base",
                                   model_kwargs={'device': EMBEDDING_DEVICE})

text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(documents=docs)
vector = FAISS.from_documents(documents=documents, embedding=embeddings)
retriever = vector.as_retriever()


# prompt for chat model
prompt = ChatPromptTemplate.from_messages([
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
    ("user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation")
])

retriever_chain = create_history_aware_retriever(chat_model, retriever, prompt)


prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer the user's questions based on the below context:\n\n{context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
])

document_chain = create_stuff_documents_chain(chat_model, prompt)
retrieval_chain = create_retrieval_chain(retriever_chain, document_chain)


chat_history = [
    HumanMessage(content="do you know my name"),
    AIMessage(content="sorry, i don't know your name")
]
chat_history.append(HumanMessage(content="please remember my name, i'm anvery"))
chat_history.append(AIMessage(content="ok anvery, i will remember your name"))


#create Agent
from langchain.agents import Tool
from langchain.chains import LLMMathChain
from langchain.agents import Tool

llm_math = LLMMathChain(llm = chat_model)

# initialize the math tool
math_tool = Tool(
    name ='Calculator',
    func = llm_math.run,
    description ='Useful for when you need to answer questions about math.'
)
# when giving tools to LLM, we must pass as list of tools
tools = [math_tool]


from langchain import hub

prompt = hub.pull("hwchase17/react")
model = chat_model

agent = create_react_agent(llm=chat_model, tools=tools, prompt=prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)



while True:
    human_message = input("plz enter your question(enter 'exit' to end the chat)")
    if human_message == "exit":
        break

    if any(char.isdigit() for char in human_message):
        ai_message = agent_executor.invoke({"input":human_message})['output']
    else:
        response = retrieval_chain.invoke({
            "chat_history": chat_history,
            "input": human_message
        })
        ai_message = response["answer"]
    print("The answer is：", ai_message)
    #add chat history
    ai_message = "The answer is" + str(ai_message)
    chat_history.append(HumanMessage(content=human_message))
    chat_history.append(AIMessage(content=ai_message))

print("END....")


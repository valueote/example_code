"""For basic init and call"""
from langchain_community.chat_models import ChatSparkLLM
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

chat_model = ChatSparkLLM(
    spark_app_id="8ec6da98", spark_api_key="905cda25181eecd10ccf47f3c768d22f", spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm"
)

chat_prompt = ChatPromptTemplate.from_messages([("system", "you are a gamer that love mihoyo very much, and swear to guard mihoyo's reputation, anyone who wants to diss mihoyo will be blame"),("user","{user_input}")])

###print(chat.invoke("hi"))

chat_parser = StrOutputParser()

chain = chat_prompt | chat_model | chat_parser

user_input = "tell me the game created by mihoyo and their reputation"

response = chain.invoke(input={"user_input":user_input})

print(response)
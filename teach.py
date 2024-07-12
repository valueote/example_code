"""For basic init and call"""
from langchain_community.chat_models import ChatSparkLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema import (
    AIMessage,
    SystemMessage,
    HumanMessage
)
from langchain.prompts.chat import (
    ChatPromptTemplate,
    ChatMessagePromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)

#chat model config
chat_model = ChatSparkLLM(
    spark_app_id="8ec6da98", spark_api_key="905cda25181eecd10ccf47f3c768d22f", spark_api_secret="MzBlMzVhMTY3NGI1NjJiMzI3NzRiYWRm"
)

chat_prompt = ChatPromptTemplate.from_messages([("system", "you are a gamer that love mihoyo very much, and swear to guard mihoyo's reputation, anyone who wants to diss mihoyo will be blame"),("user","{user_input}")])


chat_parser = StrOutputParser()

chain = chat_prompt | chat_model | chat_parser




system_template_str = "你是一个翻译专家，擅长将 {input_language} 翻译为 {output_language}。请翻译一下句子。"

human_template_str = "{text}"

system_message_prompt = SystemMessagePromptTemplate.from_template(system_template_str)
#
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template_str)

chat_prompt = ChatPromptTemplate.from_messages([
    system_message_prompt, human_message_prompt
])

chat_msgs = chat_prompt.format_prompt(input_language="英语",
                                      output_language="中文",
                                      text="I love panda.")


response = chat_model.invoke(input=chat_msgs)
print(response)
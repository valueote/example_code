
from langchain_community.chat_models import ChatTongyi


DASHSCOPE_API_KEY = "sk-bcc2e64306174cee815495363f8457c3"

import os

os.environ["DASHSCOPE_API_KEY"] = DASHSCOPE_API_KEY

from langchain_community.chat_models.tongyi import ChatTongyi
from langchain_core.messages import HumanMessage

chatLLM = ChatTongyi(
    streaming=True,
)

res = chatLLM.stream([HumanMessage(content="hi")], streaming=True)
for r in res:
    print("chat resp:", r)

from langchain_core.messages import HumanMessage, SystemMessage


from langchain_core.messages import HumanMessage, SystemMessage

messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="Translate this sentence from English to Chinese: I love programming."
    ),
]


res = chatLLM.stream(messages, streaming=True)
for r in res:
    print("chat resp:", r)

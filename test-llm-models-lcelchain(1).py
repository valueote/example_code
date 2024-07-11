# 初始化 AKs&SKs
import os
# sparkllm
os.environ["IFLYTEK_SPARK_APP_ID"] = "1a2c0e22"
os.environ["IFLYTEK_SPARK_API_KEY"] = "91ac602cffda5c10bbb78fc314f8525d"
os.environ["IFLYTEK_SPARK_API_SECRET"] = "ODYyMWEzMDViNGVjMWZjYWQyMmE5YWJi"
#　此处参考：https://www.xfyun.cn/doc/spark/Web.html
os.environ["IFLYTEK_SPARK_API_URL"] = "wss://spark-api.xf-yun.com/v3.1/chat"
os.environ["IFLYTEK_SPARK_llm_DOMAIN"] = "generalv3"

# zhipuai
os.environ["ZHIPUAI_API_KEY"] = "f51b7baeb14b18b9b8b67d5e094f60bb.9p8M96Yx98uh8GWj"

# 生成/构建 语言模型- Chat Model
'''
    导包 + 实例化
    可能还需要 安装 python 第三方模块
'''
# sparkllm model
from langchain_community.chat_models import ChatSparkLLM
spark_chat_model = ChatSparkLLM()
# zhipuai model
from langchain_community.chat_models import ChatZhipuAI
zhipuai_chat_model = ChatZhipuAI(model="glm-4")
# 完成模型的选用，统一封装为 chat_model
# chat_model = spark_chat_model
chat_model = zhipuai_chat_model

# LCEL chain
# 冒烟测试
# print(chat_model.invoke("请介绍一下李商隐"))
# I : PromptTemplate
from langchain_core.prompts import ChatPromptTemplate
# 是在 list/列表中
chat_prompt = ChatPromptTemplate.from_messages([
    # 元组方式，构建 SystemMessagePromptTemplate
    ("system", "你是一个高级别的历史研究者，擅长用一句话输出回答。"),
    # 元组方式，构建 HumenMessagePromptTemplate
    ("user", "{user_input}")
])
# P : chat_model
# O : OuputParser
from langchain_core.output_parsers import StrOutputParser
output_parser = StrOutputParser()

# 生成/构成 链(chain-LCEL chain)
lcel_chain = chat_prompt | chat_model | output_parser

# 调用/执行 链(chain-LECL chain)
# 给出真实的输入，获取响应并输出
user_input = "请介绍一下杜甫"
# response = lcel_chain.invoke(input=user_input)
response = lcel_chain.invoke(input={"user_input": user_input})
print(response)

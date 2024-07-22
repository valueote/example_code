# 关键是要最终/最先 生成 ChatPromptTemplate ==chat_messages_prompt_template
'''
生成 用于 chat_model 输入提示消息 列表，两条路径
    A. 基于各种角色的Message类（SystemMessage   HumanMessage）列表的封装
        各种 Message类 底层就是 PromptTemplate，再经由 to_message() 方法生成
        本质：SystemMessagePromptTemplate、HumanMessagePromptTemplate 是 PromptTemplate 的子类！！
        生成流程：
        A-1. 生成消息提示模板字符串，含有占位符变量
            如：
            系统消息提示模板字符串
            system_message_prompt_template_str: str = "你是一位专业顾问，负责为专注于{product}的公司起名。"
            提问人消息提示模板字符串
            human_message_prompt_template_str: str = "公司主打产品是{product_detail}。"
        A-2. 生成消息提示模板对象，类似 PromptTemplate 对象
            如：
            系统消息提示模板对象
            system_message_prompt_template: SystemMessagePromptTemplate =
                SystemMessagePromptTemplate.from_template(system_message_prompt_template_str)
            提示人消息模板对象
            human_message_prompt_template: HumanMessagePromptTemplate =
                HumanMessagePromptTemplate.from_template(human_message_prompt_template_str)
        A-3. 生成聊天消息提示模板对象：封装 前述的各类消息的列表
            chat_messages_prompt_template: ChatPromptTemplate = ChatPromptTemplate.from_messages(
                [
                    system_message_prompt_template,
                    human_message_prompt_template,
                ]
            )
        分两步（也可以合称为一步）生成 用于聊天输入 的 聊天消息 列表
        A-4. 格式化方式生成 用于 聊天输入 的 聊天消息提示值对象，填充占位符变量实际值
            chat_messages_prompt_value: PromptValue = chat_messages_prompt_template.format_prompt(
                product="鲜花装饰", product_detail="创新的鲜花设计。"
            )
        A-5. 生成 用于聊天输入的 聊天消息列表
            chat_messages: list[BaseMessage] = chat_messages_prompt_value.to_messages()
    B. 基于角色声明方式生成直接生成 chat_messages ==OpenAI 方式
'''
# 导入聊天消息类模板
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain_core.prompt_values import ChatPromptValue, PromptValue
from langchain_core.messages import BaseMessage, AIMessage

# 系统消息提示模板：一般用于指定角色、怎么做
# A-1. 生成 系统消息提示模板字符串
system_message_prompt_template_str: str = "你是一位专业顾问，负责为专注于{product}的公司起名。"
print("A-1. 系统消息提示模板字符串：\n", system_message_prompt_template_str, end="\n\n")
# A-2. 生成 系统消息提示模板对象
system_message_prompt_template: SystemMessagePromptTemplate = SystemMessagePromptTemplate.from_template(
    system_message_prompt_template_str)
print("A-2. 系统消息提示模板对象：\n", system_message_prompt_template, end="\n\n")
# 提问人提示模板：一般就是提出的具体的问题
# A-1. 生成 提问人消息提示模板字符串
human_message_prompt_template_str: str = "公司主打产品是{product_detail}。"
print("A-1. 提问人消息模板字符串：\n", human_message_prompt_template_str, end="\n\n")
# A-2. 生成 提问人消息提示模板对象
human_message_prompt_template: HumanMessagePromptTemplate = HumanMessagePromptTemplate.from_template(
    human_message_prompt_template_str)
print("A-2. 提问人消息模板对象：\n", human_message_prompt_template, end="\n\n")

# A-3. 生成 聊天消息提示模板对象， 封装 系统消息提示对象+提问人消息提示对象 构成的列表
chat_messages_prompt_template: ChatPromptTemplate = ChatPromptTemplate.from_messages(
    [
        system_message_prompt_template,
        human_message_prompt_template,
    ]
)
print("A-3. 聊天消息提示模板对象：\n", chat_messages_prompt_template, end="\n\n")
# 分两步（也可以合称为一步）生成 用于聊天输入 的 聊天消息 列表
# A-4. 格式化方式生成 聊天消息提示值对象，填充占位符变量实际值
chat_messages_prompt_value: PromptValue = chat_messages_prompt_template.format_prompt(
    product="手机", product_detail="华为手机",
)
print("A-4. 聊天消息提示值对象：\n", chat_messages_prompt_value, end="\n\n")
# A-5. 生成 用于聊天输入的 聊天消息列表
chat_messages: list[BaseMessage] = chat_messages_prompt_value.to_messages()
print("A-5. 聊天消息列表：\n", chat_messages, end="\n\n")

# chat_messages_prompt_template: ChatPromptTemplate = ChatPromptTemplate.from_messages([
#     ("system", "Answer the user's questions based on the below context:\n\n{context}"),
#     # ("system", "根据以下上下文回答用户的问题:\n\n{context}"),
#     ("user", "{input}"),
# ])
# chat_messages_prompt_value: PromptValue = chat_messages_prompt_template.format_prompt(
#     product="手机", product_detail="华为手机",
# )
# chat_messages: list[BaseMessage] = chat_messages_prompt_value.to_messages()
# 验证 ChatPromptTemplate
# from langchain_openai.chat_models.base import BaseChatOpenAI
from langchain_00_modelchoise import models
models.set_env()
chat_model = models.openai_chat_model()
# 测试提示字符串
'''
首先：invoke 方法
    chat_models.py 中
    def invoke(
            self,
            input: LanguageModelInput,
            config: Optional[RunnableConfig] = None,
            *,
            stop: Optional[List[str]] = None,
            **kwargs: Any,
        ) -> BaseMessage:
        invoke 的实现代码
然后：input: LanguageModelInput,
    base.py 中：
    LanguageModelInput = Union[PromptValue, str, Sequence[MessageLikeRepresentation]]
    即：input可能有三种选择：
    1. str
    2. PromptValue
    
'''
# 1. invoke input=str
# completion: AIMessage = chat_model.invoke(input="你是一位专业顾问，负责为专注于手机的公司起名。公司主打产品是华为手机。")
# 2. invoke input=PromptValue
# completion: AIMessage = chat_model.invoke(input=chat_messages_prompt_value)
# 3. invoke input=Sequence[MessageLikeRepresentation
'''
    base.py 中：
        Sequence[MessageLikeRepresentation]
    utils.py 中：
        MessageLikeRepresentation = Union[
        BaseMessage, List[str], Tuple[str, str], str, Dict[str, Any]
        ]
    这次 选 [BaseMessage]
'''
completion: AIMessage = chat_model.invoke(input=chat_messages)
print("模型回答：", completion.content)
print("响应元数据（含有 token quote 等）：", completion.response_metadata)

"""
API :
    chat.py
      def from_messages(
            cls,
            messages: Sequence[MessageLikeRepresentation],
            template_format: Literal["f-string", "mustache"] = "f-string",
        ) -> ChatPromptTemplate:
            具体实现代码
        其中，参数：
            MessageLikeRepresentation = Union[
                MessageLike,
                Tuple[
                    Union[str, Type],
                    Union[str, List[dict], List[object]],
                ],
                str,
            ]
        说明，参数可以是 MessageLike...，可以看一下是啥
             参数可以是 Tuple 列表，其中含有 role 和 string
"""
# 关键是 构建各种 Messages，然后封装 到 ChatPromptValue 或者 List[BaseMessage] 作为 chat_model 的输入
# B-1. 生成 角色、提示字符串
system_role_str: str = "system"
system_message_str: str = "你是一位专业顾问，负责为专注于{product}的公司起名。"
# human_role_str: str = "user"
human_role_str: str = "human"
human_message_str: str = "公司主打产品是{product_detail}。"
# B-2. 拼接生成 Tuple 格式的 角色，角色消息字符串
from typing import Tuple, List
system_message_prompt_template_tuple: Tuple[str, str] = (system_role_str, system_message_str)
human_message_prompt_template_tuple: Tuple[str, str] = (human_role_str, human_message_str)
# 后续和 A类 方法一致，生成 聊天消息提示模板对象、聊天消息提示值对象、聊天消息列表
# B-3. 生成 聊天消息提示模板对象， 封装 系统消息提示对象+提问人消息提示对象 构成的列表
chat_messages_prompt_template_list: List[Tuple[str, str]] = [
    system_message_prompt_template_tuple,
    human_message_prompt_template_tuple,
]
chat_messages_prompt_template: ChatPromptTemplate = ChatPromptTemplate.from_messages(
    chat_messages_prompt_template_list
)
# chat_messages_prompt_template: ChatPromptTemplate = ChatPromptTemplate.from_messages([
#     system_message_prompt_template_tuple,
#     human_message_prompt_template_tuple,
# ])
# 此时，就有两种方法，生成 chat_model 所需的输入
# B-4. 生成 PromptValue(聊天消息提示值对象)， 传入 chat_model 输入
chat_messages_prompt_value: PromptValue = chat_messages_prompt_template.format_prompt(
    product="手机", product_detail="华为手机",
)
# completion: AIMessage = chat_model.invoke(input=chat_messages_prompt_value)
# B-5. 生成 List[BaseMessage](聊天消息列表)， 传入 chat_model 输入
chat_messages: list[BaseMessage] = chat_messages_prompt_value.to_messages()
# 此种方式，有可能不会生成答案，而是回答：明白、收到...等...
completion: AIMessage = chat_model.invoke(input=chat_messages)
print(completion)
print("End.")


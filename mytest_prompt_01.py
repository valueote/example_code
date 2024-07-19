# 获取 chatmodel
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

chat_model_openai = ChatOpenAI(
    # openai API https://platform.openai.com/docs/models
    model="gpt-3.5-turbo",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

chat_model = chat_model_openai

# 1. 解析 提示词(input str) 生成过程
# 1-1. 生成 提示词模板字符串（原始模板） ，注意：""" \n
prompt_template_str: str = """您是一位手机文案撰写专家。\n
对于售价为 {price} 元的 {phone_name} ，您能提供一份足够吸引人的简短的描述文字吗？
"""
# 1-2. 生成 提示词模板 对象，
# 基于 提示词模板字符串，调用 LangChain提示词模板类(PromptTemplate) 的类方法 生成
prompt_template: PromptTemplate = PromptTemplate.from_template(
    template=prompt_template_str,
)
print(prompt_template)
# for attr in dir(prompt_template):
#     print(attr, getattr(prompt_template, attr))
# for attr in prompt_template.__dict__:
#     print(attr, prompt_template.__dict__[attr])

# 1-3. 生成 输入提示词字符串  format实例方法
prompt_str_input: str = prompt_template.format(phone_name="华为", price="50")
print(prompt_str_input)


# 2. 将 prompt_str 作为 input
# 2-1. 单一 IO
from langchain_core.messages import AIMessage
completion: AIMessage = chat_model.invoke(input=prompt_str_input)
print(completion)
print(completion.content)
print(completion.response_metadata)

# 2-2. 多次 IO
phone_names = ['华为', '小米', '苹果']
prices = ['500', '300', '200']
for phone_name, price in zip(phone_names, prices):
    prompt_str_input: str = prompt_template.format(phone_name=phone_name, price=price)
    completion: AIMessage = chat_model.invoke(input=prompt_str_input)
    print(completion.content.strip())

# 3. Model I/O，主要是 结构化输出解析器
# 使用 partial_variables 指定 output_parser，实现输出格式的指定
# 导入 提示模板类
from langchain.prompts import PromptTemplate
# 3-1. 生成含有 输出格式要求 占位符 的提示模板字符串
prompt_template_str = ("""您是一位轿车销售文案专家。 \n
        对于售价为 {price} 元的 {car_name} ，您能提供一个吸引人的简单描述？
        {format_instructions}"""
)
# 3-2. 声明/定义 输出/响应 的模式
# 导入 输出的模式：结构化解析器、响应结构
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
# 3-2-1. 声明输出的响应结构
response_schemas: list[ResponseSchema] = [
    ResponseSchema(name="description", description="文案"),
    ResponseSchema(name="reason", description="原因"),
]
# 3-3. 绑定输出解析器 +ResponseSchema
output_parser: StructuredOutputParser = (StructuredOutputParser
                                          .from_response_schemas(response_schemas=response_schemas))
# 3-4. 提取/获取 提示模板中的 输出转换器所需的指示格式的字符串
format_instructions: str = output_parser.get_format_instructions()
print("输出中用到的格式指示字符串：", format_instructions)
# 3-5. 绑定到 输入的 提示模板字符串 生成的 模板对象中
prompt_template: PromptTemplate = PromptTemplate.from_template(
    template=prompt_template_str,
    partial_variables={"format_instructions": format_instructions}
)
print("提示模板对象：", prompt_template)

# 完成 i m o=>csvfile
car_names = ["奔驰","宝马","路虎"]
prices = ["500","300","200"]

import pandas as pd
df = pd.DataFrame(columns=["car_name", "price", "description", "reason"])
for car_name, price in zip(car_names, prices):
    prompt_str_input: str = prompt_template.format(car_name=car_name, price=price)
    print("输入的提示词字符串：", prompt_str_input)
    output_completion: AIMessage = chat_model.invoke(input=prompt_str_input)
    # 不是必须，进行 生成输出 的解析
    from typing import Dict, Any
    print("实际获取的输出内容：", output_completion.content.strip())
    parsed_output_completion: Dict[str, Any] = output_parser.parse(output_completion.content)
    # 追加 两个列：car_name、price
    parsed_output_completion["car_name"]: str = car_name
    parsed_output_completion["price"]: str = price
    # 追加到 DataFrame
    df.loc[len(df)] = parsed_output_completion
# 打印
print(df)
print("dataframe中的记录内容：", df.to_dict(orient="records"))
# 保存 dataframe 到 本地csv文件
df.to_csv("cars_with_desc.csv", index=False)

print("end.")
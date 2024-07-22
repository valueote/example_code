'''
用于 问答模型 -llm_model
涉及组件： 提示模板字符串 -> 提示模板对象 [-> 提示对象 ->] 提示字符串
1. 生成 提示模板字符串 prompt_template_str: str
    含有 {占位字符串=占位变量名}
2. 生成 提示模板对象 prompt_template: PromptTemplate
    两种方法：
    2-1. 类方法：.from_template(template=提示模板字符串)
    或者
    2-2. 构造函数：PromptTemplate(
        input_variables=["占位字符串=占位变量名", "占位字符串=占位变量名"],
        template=提示模板字符串,
    )
3.生成 用于输入的 提示字符串 prompt_str_input
    两种途径
    3-1. 直接生成: 实例方法
        .format(占位变量名="实际值", 占位变量名="实际值", ...)
    3-2. 先生成 提示值对象，然后再生成 提示字符串
        3-2-1. 提示值对象 prompt_value: PromptValue
            实例方法： .format_prompt(占位变量名="实际值", 占位变量名="实际值", ...)
        3-2-2. 提示字符串 prompt_str_input: str
            实例方法： .to_string()
    或者
        3-2-3. == 将 提示值对象，转换为 字符串类型的提示值对象 StringPromptValue
            再使用 对象属性 .text 获取 提示字符串
                但是 参数总写不对
        3-2-4. == .to_messages()  此处不建议使用
            生成 List[HumanMessage] 类型的 提问人提示消息列表

'''
from typing import List

# 导包：导入 提示模板类
from langchain.prompts import PromptTemplate
from langchain_core.messages import HumanMessage
from langchain_core.prompt_values import PromptValue, StringPromptValue

# 1. 生成 提出模板字符串
prompt_template_str: str = """\n
你是业务咨询顾问。
对于一个面向{market}市场的，专注于销售{product}的公司，请推荐一个好的名字？
"""
# 2. 生成 提示模板对象
# 2-1. 使用类方法
# prompt_template: PromptTemplate = PromptTemplate.from_template(
#     template=prompt_template_str
# )
# 2-2. 使用构造函数
prompt_template: PromptTemplate = PromptTemplate(
    input_variables=["product", "market"],
    template=prompt_template_str,
)
# 3. 生成 用于输入的 提示字符串
# 3-1. 直接使用 format 实例方法，生成 用于 输入的提示字符串
# prompt_str_input: str = prompt_template.format(product="珠宝", market="高端")
# 3-2. 或者先转为 PromptValue 提示值对象，再 .to_string() 生成 用于 输入的提示字符串
# 3-2-1. 生成 提示值对象
prompt_value: PromptValue = prompt_template.format_prompt(product="珠宝", market="高端")
# 3-2-2. 生成 提示字符串
prompt_str_input: str = prompt_value.to_string()
# 3-2-3. 转换为 StringPromplate 处理
# 参数写不对
# prompt_value: StringPromptValue = StringPromptValue(
#     prompt_template.format_prompt(
#         product="aa", market="bb"
#     )
# )
# prompt_str_input: str = prompt_value.text  # 匹配上面的 StringPromptValue 类
# 3-2-4. 或者 将 PromptValue 值类型的提示对象 调用 .to_message() 转为 HumanMessage 类型的 对话输入消息
# 一般在 PromptTemplate 中不用此种方法
prompt_str_input_: List[HumanMessage] = List[HumanMessage] (prompt_value.to_messages())
# 打印 输入提示模板字符串
print(prompt_str_input)

'''
程序功能：
生成提示字符串、模型调用、解析输出、将解析好的数据存入 CSV 文档
'''
# 1. 生成 用于输入 的 提示字符串
# 1-0. 导入LangChain中的提示模板
from langchain.prompts import PromptTemplate
# 1-1. 创建原始模板（提示词模板字符串）
prompt_template_str: str = """您是一位专业的手机店文案撰写员。\n
对于售价为 {price} 元的 {phone_name} ，您能提供一个吸引人的简短描述吗？
"""
print("提示模板字符串： ", prompt_template_str, end="\n\n")
# 1-2. 根据原始提示词模板字符串 使用 PromptTemplate 类的 from_template 方法 创建 LangChain 提示模板对象
prompt_template: PromptTemplate = PromptTemplate.from_template(prompt_template_str)
# 打印LangChain 提示模板对象
print("提示模板对象： ", prompt_template, end="\n\n")
# 关注其中的 __dict__ 属性
# for attr in dir(prompt_template):
#     print(attr, getattr(prompt_template, attr))
# 提示模板的具体内容如下：
print("提示模板对象 内容：\n")
print(prompt_template.__dict__)
for attr in prompt_template.__dict__:
    print(attr, prompt_template.__dict__[attr])
'''
    代码解释：
        创建一个LangChain提示模板，该模板用于生成关于手机描述的文本。
        首先，通过原始模板创建了一个包含输入变量、输出解析器、部分变量、模板、模板格式和验证模板设置的PromptTemplate对象。
        原始模板是一个f-string格式的文本，其中包含两个变量{prompt_name}和{price}，分别表示手机的名称和价格。
        通过from_template方法将原始模板转化为一个更丰富、更方便操作的PromptTemplate对象，以便在LangChain中进行提示生成。
        这个对象包含了模板的详细信息，包括输入变量、输出解析器、模板格式和验证模板的设置。
        通过这个提示模板，可以轻松地根据具体的手机和价格生成吸引人的描述文本。
    输出内容：
        name None
        input_variables ['phone_name', 'price']
        optional_variables []
        input_types {}
        output_parser None
        partial_variables {}
        metadata None
        tags None
        template 您是一位专业的手机店文案撰写员。
        
        对于售价为 {price} 元的 {phone_name} ，您能提供一个吸引人的简短描述吗？
        
        template_format f-string
        validate_template False
        end
    输出内容解析：
        PromptTemplate对象就是 LangChain 中的提示模板
        提示模板字符串：
            一段描述某种prompt的文本格式，是一个 f-string
            其中可能有零/多个{变量}，是模板里面的占位符
            在实际使用模板生成提示词实例时会被具体的值替换
        提示模板对象
            由PromptTemplate的from_template 类方法，直接基于一个提示模板字符串中创建一个 PromptTemplate 对象，
            其中含有：
                输入的变量、输出解析器、模板的格式（'f-string'）、是否验证模板
            PromptTemplate.from_template 方法是将一个原始的提示模板字符串转化为一个丰富全面、方便操作的 PromptTemplate 对象
    具体内容：
        input_variables=['flower_name', 'price']：
            这是一个包含在模板中使用的输入变量的列表。
            使用了'phone_name'和'price'两个变量，用具体的值（如苹果、20元）来替换这两个变量。
        output_parser=None：
            这是选择在模板中使用的一个输出解析器。
            此例中，没有选择在模板中使用输出解析器，而是在模型外部进行输出解析，因此是None。
        partial_variables：
            包含在模板中使用但在生成模板时无法立即提供的变量。
            通过'format_instructions'传入了输出格式的详细说明。
        template：
            原始模板字符串本身。它包含了模型生成文本的结构。
            在这个例子中，模板字符串是询问手机描述的问题，以及关于输出格式的说明。
        template_format='f-string'：
            表示模板字符串的格式选项。这里使用的是f-string格式。
        validate_template=True：
            表示是否在创建模板时检查模板的有效性。选择了在创建模板时进行检查，以确保模板是有效的。
    综合来看，这个提示模板是一个用于生成模型输入的工具。
        可以在模板中定义需要的输入变量，以及模板字符串的格式和结构，
        然后使用这个模板来为每种手机生成一个描述。
'''
# 1-3. 格式化后生成 用于输入 的 提示字符串
prompt_str_input: str = prompt_template.format(phone_name="华为", price='50')
print("提示字符串：", prompt_str_input, end="\n\n")

# 获取 chatmodel
from langchain_00_modelchoise import models
models.set_env()
# chat_model = models.openai_chat_model()
chat_model = models.spark_chat_model()

# 2. 模型调用，接受 提示字符串输入，并返回
# 注意：此程序，使用 chat_model 替代 QALLM
# 2-1. 单一IO：单一提示词字符串，模型调用
# 导包
from langchain_core.messages import AIMessage
# 得到模型的输出
completion: AIMessage = chat_model.invoke(input=prompt_str_input)
# 打印输出内容
print("模型输出的响应的类型： ", type(completion), end="\n")
print("模型输出的响应： \n", completion, end="\n")
print("模型输出的响应的实际文本内容： \n", completion.content, end="\n")
print("模型输出的响应的元数据（含有token相关消息）： \n", completion.response_metadata)

# 2-2. 多次IO（本质：复用提示模板）
from typing import List
phone_names: List[str] = ["华为", "小米", "苹果"]
prices: List[str] = ["50", "30", "20"]

# 循环调用模型响应的Completion，生成文案
for phone_name, price in zip(phone_names, prices):
    prompt_str_input: str = prompt_template.format(phone_name=phone_name, price=price)
    completion: AIMessage = chat_model.invoke(input=prompt_str_input)
    print(completion.content.strip())   # 输出文案

# 3. Output Parser
# 导入LangChain中的提示模板
from langchain.prompts import PromptTemplate
# 3-1. 何处放置？ 创建含有 输出格式提示 占位符 的 提示模板字符串
prompt_template_str: str = """您是一位专业的轿车销售文案撰写员。
对于售价为 {price} 元的 {car_name} ，您能提供一个吸引人的简短描述吗？
{format_instructions}"""
# 导入结构化输出解析器和ResponseSchema
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
# 3-2. 定义输出结构(s)： 要接收的 响应/输出 模式（就是结构）,含有多个组成部分，声明为列表类型
'''
模型生成的答案包含两部分：描述文案（description）和撰写这个文案的原因（reason）
定义名为 response_schemas 的列表，其中包含两个 ResponseSchema 对象，分别对应这两部分的输出
'''
response_schemas: list[ResponseSchema] = [
    # description 最终在prompt中显示为 // 轿车的描述文案
    # 有些国内的LLM（说的就是SparkLLM）不支持含上述内容中文的 json 字符串，故置为英文
    # ResponseSchema(name="description", description="轿车的描述文案"),
    ResponseSchema(name="description", description="description"),
    # ResponseSchema(name="reason", description="为什么要这样写这个文案")
    ResponseSchema(name="reason", description="reason"),
]
# 3-3. 创建输出解析器对象：通过 StructuredOutputParser.from_response_schemas 方法创建
# 指定 输出结构 的 类型 为 结构化输出解析器
output_parser: StructuredOutputParser = StructuredOutputParser.from_response_schemas(
    response_schemas=response_schemas
)
# 3-4. 获取 用于嵌入输入提示中的 输出格式指示/说明字符串，从 输出解析器对象中 使用实例方法 .get_format_instructions 提取
# 将 输出解析器 转换为 字符串 形式
format_instructions: str = output_parser.get_format_instructions()
# 打印生成的提示模板中的格式字符串
print("提示模板中格式指示字符串： \n", format_instructions, end="\n")
# 3-5. 生成 提示模板对象，含有 提示模板字符串 + 输出格式指示字符串
# 根据提示模板生成/创建提示词输入，参数为：提示词模板字符串、输出格式指示器（作为partial_variables）
prompt_template: PromptTemplate = PromptTemplate.from_template(
    template=prompt_template_str,
    partial_variables={"format_instructions": format_instructions}
)
print("含有输出格式提示的最终提示模板对象：\n", prompt_template, end="\n")

# 数据准备
car_names = ["奔驰", "宝马", "路虎"]
prices = ["50", "30", "20"]

# 创建一个空的DataFrame用于存储结果
import pandas as pd
df = pd.DataFrame(columns=["car", "price", "description", "reason"])  # 先声明列名

for car_name, price in zip(car_names, prices):
    # 根据提示准备模型的输入
    prompt_str_input: str = prompt_template.format(car_name=car_name, price=price)
    print("最终的用于输入的提示字符串：", prompt_str_input, end="\n")
    # 获取模型的输出
    output_completion: AIMessage = chat_model.invoke(input=prompt_str_input)

    # 解析模型的输出（这是一个字典结构）
    from typing import Dict, Any, List
    parsed_output_completion:  Dict[str, Any] = output_parser.parse(output_completion.content)

    # 在解析后的输出中添加“car”和“price”
    parsed_output_completion['car']: str = car_name
    parsed_output_completion['price']: str = price

    # 将解析后的输出添加到DataFrame中
    df.loc[len(df)] = parsed_output_completion

# 打印字典
print(df.to_dict(orient='records'))

# 保存DataFrame到CSV文件
df.to_csv("cars_with_descriptions.csv", index=False)


print("end")

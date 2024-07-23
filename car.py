from langchain_community.vectorstores import Qdrant
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import SemanticSimilarityExampleSelector, FewShotPromptTemplate
from typing import List, Dict
from langchain_core.prompts import PromptTemplate
from modelchoise import modelchoise

# 初始化 HuggingFaceEmbeddings
EMBEDDING_DEVICE = "cpu"
embeddings = HuggingFaceEmbeddings(model_name="..\models\m3e-base",
                                   model_kwargs={'device': EMBEDDING_DEVICE})

# 示例数据
samples: List[Dict[str, str]] = [
    {
        "car_type": "宝马",
        "occasion": "豪华",
        "ad_text": "宝马，以其卓越的驾驶体验和豪华的设计，完美展现你的品味与地位。"
    },
    {
        "car_type": "特斯拉",
        "occasion": "科技",
        "ad_text": "特斯拉，代表未来科技的先锋，配备先进的自动驾驶技术和创新的电动系统。"
    },
    {
        "car_type": "丰田",
        "occasion": "可靠、经济",
        "ad_text": "丰田以其出色的耐用性和经济性，成为家庭出行的理想选择，提供安心与省油的驾驶体验。"
    },
    {
        "car_type": "奥迪",
        "occasion": "运动、豪华",
        "ad_text": "奥迪，融合了运动性能与豪华设计，适合追求驾驶乐趣和高级感的车主。"
    }
]

# 提示模板字符串, 含有样本列表中的样本中的所有输入、输出的占位符
prompt_template_str: str = "车辆类型：{car_type}\n场景：{occasion}\n广告文案：{ad_text}"

# 提示模板对象，基于样例
prompt_template_sample: PromptTemplate = PromptTemplate.from_template(
    template=prompt_template_str,
)

# 设置环境变量并获取聊天模型
modelchoise.os_setenv()
chat_model = modelchoise.get_spark_chat_model()

# 初始化示例选择器
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples=samples,
    embeddings=embeddings,
    vectorstore_cls=Qdrant,
    k=2,
)

# 创建 FewShotPromptTemplate
few_shot_prompt_template_sample_by_example_selector = FewShotPromptTemplate(
    example_selector=example_selector,
    example_prompt=prompt_template_sample,
    suffix="车辆类型：{car_type}\n场景：{occasion}\n",
    input_variables=["car_type", "occasion"],
)

# 用户交互部分
while True:
    car_type = input("请输入车辆类型（输入end结束）：")
    if car_type.lower() == "end":
        break
    occasion = input("请输入场合：")

    # 生成 FewShotPromptTemplate 提示字符串
    few_shot_prompt_by_example_selector_str = few_shot_prompt_template_sample_by_example_selector.format(
        car_type=car_type,
        occasion=occasion
    )

    # 调用模型生成广告文案
    completion = chat_model.invoke(input=few_shot_prompt_by_example_selector_str)
    print(completion.content.strip(), end="\n\n")

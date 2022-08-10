import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./detail.less";
import { reqProductInfoById, reqCategoryInfoById } from "../../api";

export default function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [productInfo, setProductInfo] = useState({ categoryName: "" });

  // 详情列表值
  const data = [
    {
      title: "商品名称：",
      value: productInfo.name || "",
    },
    {
      title: "商品描述：",
      value: productInfo.desc || "",
    },
    {
      title: "商品价格：",
      value: `￥${productInfo.price}` || "",
    },
    {
      title: "所属分类：",
      value: productInfo.categoryName || "",
    },
    {
      title: "商品图片：",
      value: productInfo.imgs || "",
    },
    {
      title: "商品详情：",
      value: productInfo.detail || "",
    },
  ];

  const getCategoryName = async (id) => {
    let result = await reqCategoryInfoById(id);
    const { status, data } = result;
    if (status === 0) {
      return data.name;
    } else {
      return "";
    }
  };

  // 根据商品Id获取商品信息
  const getProductInfo = async () => {
    let result = await reqProductInfoById(id);
    const { status, data, msg } = result;
    if (status === 0) {
      /* 图片在数据库存储为字符串使用此方法 */
  /*     console.log(data);
      let imgs = data.imgs;
      // 对imgs的数据格式进行转换，先去掉第一个和最后一个字符，再根据逗号进行数组转换
      if(imgs[0] instanceof Array){
        imgs = imgs[0].substring(1, imgs[0].length - 1).split(",");
        imgs = imgs.replace(/\s/g,"")
        imgs = imgs.map((img) => {
          return img.replace(/"/g, ""); //取消字符串中出现的所有逗号
        });

        // 给data一个新的属性，里面存放着图片地址的数组
        data.imgs = imgs;
        console.log(data,imgs);
      } */
      

      /* 所属分类 */
      getCategoryName(data.categoryId).then((resolve) => {
        data.categoryName = resolve;
        setProductInfo(data);
        setLoading(false);
      });
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      title={
        <div className="left-top">
          <Button
            type="link"
            size="large"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftOutlined />
          </Button>
          <span>商品详情</span>
        </div>
      }
    >
      <List
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<span className="detail-title">{item.title}</span>}
              description={
                item.title === "商品详情：" ? (
                  <span dangerouslySetInnerHTML={{ __html: item.value }}></span>
                ) : item.title === "商品图片：" ? (
                  item.value ? (
                    <span>
                      {item.value.map((img, index) => {
                        return (
                          <img
                            className="detail-img"
                            key={index}
                            src={"/upload/" + img}
                            alt="商品图片"
                          />
                        );
                      })}
                    </span>
                  ) : (
                    <span>图片不存在</span>
                  )
                ) : (
                  <span>{item.value}</span>
                )
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

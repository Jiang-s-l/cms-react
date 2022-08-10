import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategoryList, reqAddProdect, reqProductInfoById, reqUpdateProdect } from "../../api";
import PicturesWall from "./PicturesWall";
import RichTextEditor from "./RichTextEditor";

const { Option } = Select;

export default function Add_update() {
  const location = useLocation();
  const navigate = useNavigate();
  // 创建 Form 实例，用于管理所有数据状态
  const [form] = Form.useForm();

  const pictureRef = useRef();
  const richTextEditor = useRef();

  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    let result = await reqCategoryList(0);
    const { status, data } = result;
    if (status === 0) {
      setCategoryList(data);
    }
  };

  const [oparetionType, setOparetionType] = useState("add");
  // const [productInfo, setProductInfo] = useState({
  //   _id: "",
  //   categoryId: "",
  //   name: "",
  //   desc: "",
  //   price: "",
  //   detail: "",
  //   imgs: [],
  // });
  const getOparetionType = async () => {
    // 不为空说明为修改商品跳转过来的
    if (location.state) {
      setOparetionType("update");
      const { productId } = location.state;
      let result = await reqProductInfoById(productId);
      const { status, data } = result;
      if (status === 0) {
        // 设置表单初始内容
        form.setFieldsValue({
          name: data.name,
          desc: data.desc,
          price: data.price,
          categoryId: data.categoryId,
        });
        // setProductInfo(data);
        // 初始化图片框的内容
        pictureRef.current.setPictureArr(data.imgs)
        // 初始化富文本内容
        richTextEditor.current.setRichText(data.detail);
      } else message.warning("商品信息查找失败");
      
    }
  };


  const onFinish = async (values) => {
    // 从图片组件中获取图片的名称
    let imgArr = pictureRef.current.getPictureArr();
    values.imgs = imgArr;
    values.pCategoryId = 0;
    values.detail = richTextEditor.current.getRichText();
    let result
    if(oparetionType === 'add'){
      values._id = new Date().getTime() + Math.random().toString(36).substring(2);
      result = await reqAddProdect({ ...values });
    }else{
      const { productId } = location.state;
      values._id = productId
      result =await reqUpdateProdect({ ...values })
    }
    
    const { status, msg } = result;
    console.log(status);
    if (status === 0) {
      if(oparetionType === 'add'){
        message.success("添加成功");
      }else{
        message.success("修改成功");
      }
      navigate("/admin/prod_about/product", { replace: true });
    } else {
      message.error(msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getCategoryList();
    getOparetionType();
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
            <span>返回</span>
          </Button>
          <span>{oparetionType === "add" ? "商品添加" : "商品更新"}</span>
        </div>
      }
    >
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 7 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="商品名称："
          name="name"
          rules={[
            {
              required: true,
              message: "请输入商品名称",
            },
          ]}
        >
          <Input placeholder="商品名称" />
        </Form.Item>

        <Form.Item
          label="商品描述："
          name="desc"
          rules={[
            {
              required: true,
              message: "请输入商品描述信息",
            },
          ]}
        >
          <Input placeholder="商品描述信息" />
        </Form.Item>

        <Form.Item
          label="商品价格："
          name="price"
          rules={[
            {
              required: true,
              message: "请输入商品价格",
            },
          ]}
        >
          <Input placeholder="商品价格" />
        </Form.Item>

        <Form.Item
          label="商品分类："
          name="categoryId"
          initialValue=""
          rules={[
            {
              required: true,
              message: "请选择一个分类",
            },
          ]}
        >
          <Select placeholder="请选择分类">
            <Option value="">请选择分类</Option>
            {categoryList.map((category) => {
              return (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="商品图片" wrapperCol={{ md: 12 }}>
          <PicturesWall ref={pictureRef} />
        </Form.Item>
        <Form.Item label="商品详情" wrapperCol={{ md: 16 }}>
          <RichTextEditor ref={richTextEditor} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1,
            span: 3,
          }}
        >
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

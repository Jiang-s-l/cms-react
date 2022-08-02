import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, Modal, Form, Input, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getCategoryListAsync } from "../../redux/actions/category_action";
import { PAGE_SIZE } from "../../config";
import { reqAddCategory,reqUpdateCategory } from "../../api";

function Category(props) {
  const [isAdd, setIsAdd] = useState(false);

  
  // 创建 Form 实例，用于管理所有数据状态
  const [form] = Form.useForm();

  const [categoryId,setCategoryId] = useState('')

  // 获取分类列表
  const getCategoryList = () => {
    props.getCategoryListAsync();
  };

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      // dataIndex: "name", //有就返回对应的值，没有写就返回所有的值
      key: "action",
      align: "center",
      width: "25%",
      render: (item) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              console.log(item);
              
              // console.log(e);
              setIsAdd(false);
              setIsModalVisible(true);
              setCategoryId(item._id)
              form.setFieldsValue({
                categoryName: item.name,
              });
            }}
          >
            修改分类
          </Button>
        </Space>
      ),
    },
  ];
  const data = props.categoryList;

  const [isModalVisible, setIsModalVisible] = useState(false);

  /* // 展示弹窗
  const showModal = () => {
    
  }; */


  const handleOk = () => {
    // 1.获取用户的输入
    form.validateFields().then(async (values) => {
      //输入信息验证正确
      console.log(values,categoryId);
      let result
      if(isAdd){
        result = await reqAddCategory(0, values.categoryName);
      }else{
        result = await reqUpdateCategory(categoryId,values.categoryName)
      }
      console.log(result);
      const { status, data, msg } = result;
      console.log(status, data, msg);
      if (status === 0) {
        message.success(isAdd?"添加分类成功":"修改分类成功", 1);
        getCategoryList();
        form.resetFields();
        setIsModalVisible(false);
      } else {
        message.error(msg, 1);
      }
    });
    // 调用接口，将数据存储到数据库
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  useEffect(() => {
    getCategoryList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Card
        extra={
          <Button
            type="primary"
            onClick={() => {
              setIsAdd(true);
              setIsModalVisible(true);
            }}
          >
            <PlusCircleOutlined />
            添加
          </Button>
        }
      >
        <Table
          rowKey="_id"
          bordered
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: PAGE_SIZE }}
        />
      </Card>
      <Modal
        title={isAdd ? "新增分类" : "修改分类"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="basic"
          form={form}
        >
          <Form.Item
            label="分类名称"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "分类名称不能为空",
              },
            ]}
          >
            <Input placeholder="请输入分类名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* 组件中一般引用异步action */
export default connect((state) => ({ categoryList: state.categoryList }), {
  getCategoryListAsync,
})(Category);

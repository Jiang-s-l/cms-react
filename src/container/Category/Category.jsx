import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {getCategoryListAsync} from '../../redux/actions/category_action'
import {PAGE_SIZE} from '../../config'

function Category(props) {
 
  // 获取分类列表
  const getCategoryList = ()=>{
    props.getCategoryListAsync();
  }

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: "25%",
      render: () => (
        <Space size="middle">
          <Button type="link">修改分类</Button>
        </Space>
      ),
    },
  ];
  const data = props.categoryList;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 展示弹窗
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(()=>{
    getCategoryList()
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <Card
        extra={
          <Button type="primary" onClick={showModal}>
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
          pagination={{pageSize:PAGE_SIZE}}/>
      </Card>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form name="basic">
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* 组件中一般引用异步action */
export default connect(
  state =>({categoryList:state.categoryList}),
  {getCategoryListAsync}
)(Category)
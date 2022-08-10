import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PAGE_SIZE } from "../../config";
import { reqUserList,reqAddUser } from "../../api";

const { Option } = Select;

export default function User() {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  // 创建 Form 实例，用于管理所有数据状态
  const [form] = Form.useForm();

  // 获取用户列表
  const getUserList = async () => {
    let result = await reqUserList();
    const { status, data, msg } = result;
    if (status === 0) {
      const { users, roles } = data;
      setUserList(users.reverse());
      setRoleList(roles);
    } else {
      message.error(msg);
    }
  };
  const data = userList;
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (create_time) =>
        create_time ? dayjs(create_time).format("YYYY年MM月DD日 HH:mm:ss") : "",
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      key: "role_id",
      render: (id) => {
        let result = roleList.find((item) => {
          return item._id === id;
        });
        if (result) {
          return result.name;
        }
      },
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
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              console.log(item);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    // 1.获取用户的输入
    form.validateFields().then(async (values) => {
      //输入信息验证正确
      console.log(values);
      //调用接口，将数据存储到数据库 
      let result;
      if (isShowAdd) {
        result = await reqAddUser(values);
      } else {
        // result = await reqUpdateCategory(categoryId, values.categoryName);
      }
      console.log(result);
      const { status, data, msg } = result;
      console.log(status, data, msg);
      if (status === 0) {
        message.success(isShowAdd ? "添加用户成功" : "修改分类成功", 1);
        getUserList();
        setIsShowAdd(false)
        form.resetFields();
      } else {
        message.error(msg, 1);
      }
    });
  };

  const handleCancel = () => {
    setIsShowAdd(false)
    form.resetFields();
  };

  useEffect(() => {
    getUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Card
        extra={
          <Button type="primary" onClick={() => setIsShowAdd(true)}>
            <PlusCircleOutlined />
            添加用户
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
        title="添加用户"
        visible={isShowAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "用户名不能为空",
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "密码不能为空",
              },
            ]}
          >
            <Input type='password' placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              {
                required: true,
                message: "手机号码不能为空",
              },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "邮箱不能为空",
              },
            ]}
          >
            <Input type='email' placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role_id"
            rules={[
              {
                required: true,
                message: "必须选择一个角色",
              },
            ]}
          >
            <Select showSearch allowClear placeholder="请选择该用户所属角色">
              <Option value="">请选择一个角色</Option>
              {roleList.map((item)=><Option key={item._id} value={item._id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

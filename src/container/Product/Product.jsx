import React from "react";
import { Button, Card, Space, Table, Select, Input } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../config";

const { Option } = Select;

export default function Product(props) {
  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "商品描述",
      dataIndex: "desc",
      key: "desc",
      width: "45%",
    },
    {
      title: "价格",
      dataIndex: "price",
      align: "center",
      key: "price",
      width: "10%",
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: "10%",
      render: () => (
        <div>
          <Button type="danger">未知</Button>
          <br />
          <span>未知</span>
        </div>
      ),
    },
    {
      title: "操作",
      // dataIndex: "name", //有就返回对应的值，没有写就返回所有的值
      key: "action",
      align: "center",
      width: "25%",
      render: () => (
        <Space size="middle">
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
          <br />
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "商品名称",
      price: 100,
      desc: "一个很好的商品",
      status: 0,
    },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Select defaultValue="name" style={{ width: "120px" }} allowClear>
              <Option value="name">按名称搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="输入关键字"
              style={{ width: "150px", margin: "0 10px" }}
              allowClear
            />
            <Button type="primary">
              <SearchOutlined />
              搜索
            </Button>
          </div>
        }
        extra={
          <Button type="primary">
            <PlusCircleOutlined />
            添加商品
          </Button>
        }
      >
        <Table
          bordered
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: PAGE_SIZE }}
        />
      </Card>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Space, Table, Select, Input, message } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../config";
import {
  reqProductList,
  reqSearchProduct,
  reqUpdateProductStatus,
} from "../../api";

const { Option } = Select;

export default function Product(props) {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  // const [pages,setPages] = useState('')
  const [total, setTotal] = useState("");
  // 当前页
  let [currentPage, setCurrentPage] = useState(1);

  // 搜索方式
  const [searchType, setSearchType] = useState("productName");

  // 搜索关键字
  const [keyWord, setKeyWord] = useState("");

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
      align: "center",
      key: "status",
      width: "10%",
      render: (item) => (
        <div>
          <Button
            type={item.status === 1 ? "danger" : "primary"}
            onClick={() => {
              updateProductStatus(item._id, item.status);
            }}
          >
            {item.status === 1 ? "下架" : "上架"}
          </Button>
          <br />
          <span>{item.status === 1 ? "在售" : "停售"}</span>
        </div>
      ),
    },
    {
      title: "操作",
      dataIndex: "_id", //有就返回对应的值，没有写就返回所有的值
      key: "action",
      align: "center",
      width: "25%",
      render: (id) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              navigate(`/admin/prod_about/product/detail/${id}`, {});
            }}
          >
            详情
          </Button>
          <Button type="link"  onClick={() => {
              navigate("/admin/prod_about/product/add_update", {
                state:{productId:id}
              })
            }}>修改</Button>
          <br />
        </Space>
      ),
    },
  ];
  const data = productList;

  // 表格展示内容是否点击搜索按钮
  const [isSearch, setIsSearch] = useState(false);

  // 获取商品表格数据
  const getProductList = async (pageNum, pageSize) => {
    let result;
    if (isSearch) {
      result = await reqSearchProduct(searchType, keyWord, pageNum, pageSize);
    } else {
      result = await reqProductList(pageNum, pageSize);
    }
    // console.log(result);
    const { status, data, msg } = result;
    if (status === 0) {
      setProductList(data.list.reverse());
      // setPages(data.pages)
      setTotal(data.total);
    } else {
      message.warning(msg);
    }
  };

  // 更新商品状态
  const updateProductStatus = async (id, productStatus) => {
    // 获取商品当前状态,修改状态
    // console.log(id,productStatus);
    if (productStatus === 2) {
      productStatus = 1;
    } else productStatus = 2;
    // 发送请求
    let result = await reqUpdateProductStatus(id, productStatus);
    const { status, msg } = result;
    if (status === 0) message.success("更新状态成功");
    else message.error(msg);
    // 重新获取表格数据
    setCurrentPage(1);
    getProductList(1, PAGE_SIZE);
  };

  useEffect(() => {
    getProductList(1, PAGE_SIZE);
  }, [isSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Card
        title={
          <div>
            <Select
              defaultValue="productName"
              style={{ width: "120px" }}
              allowClear
              onChange={(value) => {
                setSearchType(value);
              }}
            >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="输入关键字"
              style={{ width: "150px", margin: "0 10px" }}
              allowClear
              onChange={(event) => {
                setKeyWord(event.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                setIsSearch(true);
                setCurrentPage(1);
                getProductList(1, PAGE_SIZE);
              }}
            >
              <SearchOutlined />
              搜索
            </Button>
          </div>
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/admin/prod_about/product/add_update", {});
            }}
          >
            <PlusCircleOutlined />
            添加商品
          </Button>
        }
      >
        <Table
          rowKey="_id"
          bordered
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: PAGE_SIZE,
            total: total,
            current: currentPage,
            showTotal: (total) => `共 ${total} 条`,
            showQuickJumper: true,
            onChange: (currentPage) => {
              setCurrentPage(currentPage);
              getProductList(currentPage, PAGE_SIZE);
            },
          }}
        />
      </Card>
    </div>
  );
}

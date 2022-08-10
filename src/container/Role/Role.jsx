import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
  Tree,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PAGE_SIZE } from "../../config";
import { reqRoleList, reqAddRole,reqAuthRole } from "../../api";
import menuList from '../../config/congif-menu'

function Role(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);

  const [isShowAuth, setIsShowAuth] = useState(false);
  const [roleId,setRoleId] = useState('')

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (time) => {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      key: "auth_time",
      render: (time) => {
        return time ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : "";
      },
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
      key: "auth_name",
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
              let result = dataSource.find((role)=>{
                return role._id === item._id
              })
              if(result) setCheckedKeys(result.menus)
              
              setIsShowAuth(true);
              setRoleId(item._id)
            }}
          >
            设置权限
          </Button>
        </Space>
      ),
    },
  ];

  // 获取角色列表
  const getRoleList = async () => {
    let result = await reqRoleList();
    const { data, status, msg } = result;
    if (status === 0) {
      setDataSource(data);
    } else {
      message.warning(msg);
    }
  };

  // 创建 Form 实例，用于管理所有数据状态
  const [form] = Form.useForm();

  // 新增角色确认按钮
  const handleOk = () => {
    // 1.获取用户的输入
    form.validateFields().then(async (values) => {
      //输入信息验证正确
      // console.log(values);
      // 调用接口，将数据存储到数据库
      let result = await reqAddRole(values.roleName);
      const { status, msg } = result;
      if (status === 0) {
        message.success("添加角色成功", 1);
        getRoleList();
        form.resetFields();
        setIsShowAdd(false);
      } else {
        message.error(msg, 1);
      }
    });
  };

  // 新增角色取消按钮
  const handleCancel = () => {
    /* form.resetFields(); */
    setIsShowAdd(false);
  };

  // 树形图数据
  const treeData = [
    {
      label: "菜单所有权限",
      key: "top",
      children: menuList
    }
  ];
  // 选中的节点
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  // 设置授权确定按钮
  const handleAuthOk = async () => {
    const {username} = props
    let result= await reqAuthRole({_id:roleId,menus:checkedKeys,auth_name:username})
    const {status,msg} = result
    if(status === 0){
      message.success("授权成功");
      setIsShowAuth(false);
      getRoleList()
    }else{
      message.error(msg)
    }
    
  };
  // 设置授权取消按钮
  const handleAuthCancel = () => {
    setIsShowAuth(false);
  };

  useEffect(() => {
    getRoleList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Card
        extra={
          <Button
            type="primary"
            onClick={() => {
              setIsShowAdd(true);
            }}
          >
            <PlusCircleOutlined />
            新增角色
          </Button>
        }
      >
        <Table
          rowKey="_id"
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: PAGE_SIZE }}
        />
      </Card>
      {/* 新增角色弹窗 */}
      <Modal
        title="新增角色"
        visible={isShowAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form name="basic" form={form}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: "角色名称不能为空",
              },
            ]}
          >
            <Input placeholder="请输入角色名" />
          </Form.Item>
        </Form>
      </Modal>
      {/* 设置权限弹框 */}
      <Modal
        title="设置权限"
        visible={isShowAuth}
        onOk={handleAuthOk}
        onCancel={handleAuthCancel}
        okText="确定"
        cancelText="取消"
      >
        <Tree
          checkable
          onCheck={onCheck}//点击复选框触发
          checkedKeys={checkedKeys}//（受控）选中复选框的树节点
          defaultExpandAll//默认展开所有树节点
          fieldNames={{title:"label"}}
          treeData={treeData}
        />
      </Modal>
    </div>
  );
}

export default connect(
  state=>({username:state.userInfo.user.username}),
  {}
)(Role)

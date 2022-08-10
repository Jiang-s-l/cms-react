import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import ImgCrop from "antd-img-crop";
import { reqDeletePicture } from "../../api";
import { BASE_URL } from "../../config";

// 将图片转换为base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const PicturesWall = forwardRef((props, PicturesRef) => {
  //子组件暴露方法
  useImperativeHandle(PicturesRef, () => ({
    getPictureArr,
    setPictureArr,
  }));

  //照片预览弹窗是否显示
  const [previewVisible, setPreviewVisible] = useState(false);
  //预览图片
  const [previewImage, setPreviewImage] = useState("");
  //预览图片名称
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  // 获取新增商品时，得到的图片数组
  const getPictureArr = () => {
    let arr = [];
    fileList.forEach((file) => {
      arr.push(file.name);
    });
    return arr;
  };

  // 修改商品时设置图片列表
  const setPictureArr = (imgArr) => {
    let fileList = []
    imgArr.forEach((item,index)=>{
      fileList.push({uid:-index,name:item,url:`${BASE_URL}/upload/${item}`})
    })
    setFileList(fileList)
  }

  //关闭预览的回调
  const handleCancel = () => setPreviewVisible(false);

  //点击预览的回调
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  //当上传图片时，图片的状态会发生几次变化
  const handleChange = async ({ file, fileList: newFileList }) => {
    if (file.status === "done") {
      newFileList[newFileList.length - 1].name = file.response.data.name;
      newFileList[newFileList.length - 1].url = file.response.data.url;
    }

    if (file.status === "removed") {
      let result = await reqDeletePicture(file.name);
      const { status, msg } = result;
      if (status === 0) {
        message.success("删除成功");
      } else message.error(msg);
    }
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    file.status = "removed";
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <ImgCrop rotate>
        <Upload
          /* 向服务器public\upload文件上传图片 */
          action="http://localhost:3000/manage/img/upload"
          method="POST"
          /* 发到后台的文件参数名 */
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleRemove}
        >
          {/* 限制上传图片张数 */}
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
      </ImgCrop>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
});

export default PicturesWall;

import {
  EditOutlined,
  FileImageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  Upload,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";

const { Text, Link } = Typography;

const { Title } = Typography;
const { Option } = Select;

const Showuser = () => {
  const [frmEdit] = Form.useForm();
  const [frmAdduser] = Form.useForm();

  //Modal add user / edit user
  const [isModalVisibleEditUser, setIsModalVisibleEditUser] = useState(false);
  const [isModalVisibleAddUser, setIsModalVisibleAddUser] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingUploadPic, setLoadingUploadPic] = useState(false);

  //
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userSelect, setUserSelect] = useState({});
  const [pname, setPname] = useState([]);
  const [userNameList, setUserNameList] = useState([]);
  const [passwordList, setPasswordList] = useState([]);
  const [newUserListName, setnewUserListName] = useState([]);
  const [newPassword, setNewPasswrod] = useState([]);

  // Show modal
  const showModalEditUser = () => {
    setIsModalVisibleEditUser(true);
    frmEdit.resetFields();
    setImageUrl();
  };
  const handleCancelEditUser = () => {
    setIsModalVisibleEditUser(false);
    frmEdit.resetFields();
    setImageUrl();
  };

  const showModalAddUser = () => {
    setIsModalVisibleAddUser(true);
    frmAdduser.resetFields();
    setImageUrl();
  };

  const handleCancelModalAddUser = () => {
    setIsModalVisibleAddUser(false);
    frmAdduser.resetFields();
    setImageUrl();
  };
  ///////
  //   useEffect(() => {
  //     console.log("test");
  //     setTimeout(() => {
  //       console.log("test 2");
  //     }, 3000);

  //     setInterval(() => {
  //       console.log("test 3");
  //       setData(dayjs().format("DD/MM/YYYY"));
  //     }, 3000);
  //   }, []);

  // สร้างฟังก์ชั่น fetchUserList มาเพื่อรีเฟรชข้อมูลใหม่ เมื่อมีการเพิ่มหรือแก้ไขข้อมูล

  const fetchUserList = async () => {
    setLoadingTable(true);
    const result = await api.get("/user");
    setUserList(result.data);
    const userNameAll = result.data.map((item) => item.user_name);
    const passwordAll = result.data.map((item) => item.password);
    setUserNameList(userNameAll);
    setPasswordList(passwordAll);
    setLoadingTable(false);
  };
  // นำฟังก์ชั่น fetchUserList มาใส่ useEffect เพื่อเรียกใช้งาน

  useEffect(async () => {
    await fetchUserList();
  }, []);

  useEffect(async () => {
    const result = await api.get("/user");
    setUserList(result.data);
  }, []);
  ////////////////// check update user
  useEffect(async () => {
    const newUser = userNameList.filter(
      (item) => item !== userSelect.user_name
    );
    const newPassword = passwordList.filter(
      (item) => item !== userSelect.password
    );
    setnewUserListName(newUser);
    setNewPasswrod(newPassword);
  }, [userSelect]);

  // ฟังก์ชั่นเรียกคำนำหน้า
  useEffect(async () => {
    const result = await api.get("/pname");
    setPname(result.data);
  }, []);
  ////////////////////////
  const [flag, setFlag] = useState();
  const checkFlagDelete = (flag_value) => {
    if (flag_value === "1") {
      setFlag(1);
    } else if (flag_value === "0") {
      setFlag(0);
    }
  };
  const [fileType, setFileType] = useState("png");

  const onFinishAdduser = async (value) => {
    // await Adduser data
    const result = await api.post(`/adddata_user`, {
      user_type: value.user_type,
      user_name: value.user_name,
      password: value.password,
      pname: value.pname,
      fname: value.fname,
      lname: value.lname,
      job_id: value.job_id,
      his_id: value.his_id,
    });
    // await Upload Image
    await api.post("/image-upload", image, {
      params: { id: `${result?.data?.insertId}.${fileType}` },
    });
    // await Update pic
    await api.put(`/update_pic/${result?.data?.insertId}`, {
      pic: `${result?.data?.insertId}.${fileType}`,
    });
    // Close modal
    setIsModalVisibleAddUser(false);
    await fetchUserList();
    setImageUrl();
  };
  ////////////////////////////
  const onFinishEditUser = async (value) => {
    const result = await api.put(`/update_user`, {
      user_type: value.user_type,
      user_name: value.user_name,
      password: value.password,
      pname: value.pname,
      fname: value.fname,
      lname: value.lname,
      job_id: value.job_id,
      his_id: value.his_id,
      flag_delete: value.flag_delete,
      id_user: value.id_user,
    });

    // await Upload Image
    console.log("image", image);
    await api.post("/image-upload", image, {
      params: { id: `${value.id_user}.${fileType}` },
    });
    // await Update pic
    await api.put(`/update_pic/ ${value.id_user}`, {
      pic: `${value.id_user}.${fileType}`,
    });
    console.log("= value.id_user =", value.id_user, fileType);
    // Close modal
    setIsModalVisibleEditUser(false);
    await fetchUserList();
    setImageUrl();
  };
  //////////////////////
  // Upload FILE
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      // setLoading(true);
      setLoadingUploadPic(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info", info);
      const type = info.file.type?.split("/")[1];
      if (type === "jpeg") {
        setFileType("jpg");
      } else {
        setFileType(type);
      }
      const formData = new FormData();
      formData.append(
        "my-image-file",
        info.file.originFileObj,
        info.file.originFileObj.name
      );
      setImage(formData);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoadingUploadPic(false);
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  /////////

  const onEdit = async (id_user) => {
    const userSelected = userList.find((item) => item.id_user === id_user);
    setUserSelect(userSelected);
    setIsModalVisibleEditUser(true);
    frmEdit.setFieldsValue({
      ...userSelected,
      flag_delete: String(userSelected.flag_delete),
    });
  };

  const columns = [
    {
      title: "Pic",
      dataIndex: "pic",
      key: "pic",
      render: (text, record) => (
        <Avatar
          src={`http://localhost:3306/image/${text}?date=${moment().format(
            "HHmmss"
          )}`}
          width="30px"
        />
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "flag_delete2",
      key: "flag_delete2",
    },
    {
      title: "ประเภทผู้ใช้",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) =>
        `${record.pname}${record.fname} ${record.lname}`,
    },
    {
      title: "Job ID",
      dataIndex: "job_id",
      key: "job_id",
    },
    {
      title: "HIS ID",
      dataIndex: "his_id",
      key: "his_id",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <div>
          <EditOutlined
            style={{ fontSize: "18px", color: "#08c" }}
            onClick={() => onEdit(record.id_user)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout keyTab="showuser">
      <>
        <Row style={{ margin: 5 }}>
          <Col span={4} order={1}>
            <Title level={2}>จัดการข้อมูลผู้ใช้งาน</Title>
          </Col>
          <Col span={4} order={2}></Col>
          <Col span={4} order={3}></Col>
          <Col span={4} order={4}></Col>
          <Col span={4} order={5}></Col>
          <Col span={4} order={6}>
            <Button
              type="primary"
              size="large"
              danger
              onClick={showModalAddUser}
            >
              <UserAddOutlined />
              ADD USER
            </Button>
          </Col>
        </Row>
      </>
      <Table
        rowClassName={(record, index) => {
          return index % 2 === 0 ? "bg-gray" : "";
        }}
        columns={columns}
        dataSource={userList}
        loading={loadingTable}
        rowKey="id_user"
      />
      {/* ///////////////MODAL//////////////////// */}
      {/* modal edit user */}
      <Modal
        title="EDIT DATA USERS"
        visible={isModalVisibleEditUser}
        onCancel={handleCancelEditUser}
        footer={false}
      >
        <Form
          form={frmEdit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinishEditUser}
        >
          <Form.Item name="id_user" hidden={true}></Form.Item>
          <Form.Item label="img" name="pic">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={dummyRequest}
            >
              <Spin spinning={loadingUploadPic}>
                {imageUrl ? (
                  <Avatar
                    size={100}
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <Avatar
                      size={100}
                      src={`http://localhost:3306/image/${
                        userSelect.pic
                      }?date=${moment().format("HHmmss")}`}
                    />
                    {loading}
                    <div style={{ marginTop: 4 }} />
                  </div>
                )}
              </Spin>
            </Upload>
          </Form.Item>
          <Form.Item label="Type" name="user_type">
            <Select>
              <Option value="SuperAdmin">SuperAdmin</Option>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Doctor">Doctor</Option>
              <Option value="Nurse">Nurse</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Username"
            name="user_name"
            rules={[
              { required: true, message: "Please input your Username!" },
              {
                validator: (rule, value, callback) => {
                  try {
                    if (newUserListName?.includes(value)) {
                      throw new Error("Something wrong!");
                    } else {
                      return callback();
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
                message: "Duplicate User Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                validator: (rule, value, callback) => {
                  try {
                    if (newPassword?.includes(value)) {
                      throw new Error("Something wrong!");
                    } else {
                      return callback();
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
                message: "Duplicate Password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="คำนำหน้า" name="pname">
            <Select>
              {pname.map((item) => (
                <Option key={item.id} value={item.pname}>
                  {item.pname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="ชื่อ" name="fname">
            <Input />
          </Form.Item>
          <Form.Item label="นามสกุล" name="lname">
            <Input />
          </Form.Item>
          <Form.Item label="JOB ID" name="job_id">
            <Input />
          </Form.Item>
          <Form.Item label="HIS ID" name="his_id">
            <Input />
          </Form.Item>
          <Form.Item label="สถานะ" name="flag_delete">
            <Select>
              <Option value="1">ปกติ</Option>
              <Option value="0">ยกเลิก</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            ยืนยัน
          </Button>
        </Form>
      </Modal>
      {/* end edit modal */}
      {/* //////////////////////////////////////////////////////// */}
      {/* Modal เพิ่มผู้ใช้งาน */}
      <Modal
        title="ADD USER"
        visible={isModalVisibleAddUser}
        // onOk={handleOk}
        onCancel={handleCancelModalAddUser}
        footer={false}
      >
        <Form
          form={frmAdduser}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinishAdduser}
        >
          <Form.Item label="img" name="pic">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={dummyRequest}
            >
              <Spin spinning={loadingUploadPic}>
                {imageUrl ? (
                  <Avatar
                    size={100}
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Avatar>
                    {loading}
                    <FileImageOutlined />
                    <div style={{ marginTop: 8 }} />
                  </Avatar>
                )}
              </Spin>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Type"
            name="user_type"
            rules={[{ required: true, message: "กรุณาเลือกประเภทผู้ใช้งาน!" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Doctor">Doctor</Option>
              <Option value="Nurse">Nurse</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Username"
            name="user_name"
            rules={[
              { required: true, message: "กรุณากรอกชื่อผู้ใช้งาน!" },
              {
                validator: (rule, value, callback) => {
                  try {
                    if (userNameList?.includes(value)) {
                      throw new Error("Something wrong!");
                    } else {
                      return callback();
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
                message: "ชื่อผู้ใช้งานนี้มีในระบบแล้ว!!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "กรุณากรอกรหัสผ่าน!" },
              {
                validator: (rule, value, callback) => {
                  try {
                    if (passwordList?.includes(value)) {
                      throw new Error("Something wrong!");
                    } else {
                      return callback();
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
                message: "รหัสผ่านนนี้มีในระบบแล้ว!!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="คำนำหน้า"
            name="pname"
            rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า!" }]}
          >
            <Select>
              {pname.map((item) => (
                <Option key={item.id} value={item.pname}>
                  {item.pname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="ชื่อ"
            name="fname"
            rules={[{ required: true, message: "กรุณากรอกชื่อเจ้าหน้าที่!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="นามสกุล"
            name="lname"
            rules={[
              { required: true, message: " กรุณากรอกนามสกุลเจ้าหน้าที่!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="JOB ID" name="job_id">
            <Input />
          </Form.Item>
          <Form.Item label="HIS ID" name="his_id">
            <Input />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            ยืนยัน
          </Button>
        </Form>
      </Modal>
      {/* end modal เพิ่มผู้ใช้งาน */}
    </Layout>
  );
};

export default Showuser;

import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";
const { Option } = Select;

function Donor_register() {
  const [newPname, setNewPname] = useState([]);
  const [newProvince, setProvince] = useState([]);
  const [newAmpure, setAmpure] = useState([]);
  const [newTumbon, setTumbon] = useState([]);
  const [newZip, setZip] = useState([]);
  const [newSex, setSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [newBloodgroup, setBloodgroup] = useState([]);
  const [strAge, setstrAge] = useState();
  const [newStrBirthday, setStrBirthday] = useState();
  const [newStrzip, setStrzip] = useState();
  const [loadingUploadPic, setLoadingUploadPic] = useState(false);

  const [frmAdd] = Form.useForm();

  function success() {
    Modal.success({
      content: "ลงทะเบียนผู้มาบริจาคเลือดเสร็จสิ้น",
      onOk: () => {
        Router.push("/Donor_donation_list");
      },
    });
  }

  useEffect(async () => {
    await fetch_pname();
    await Fetch_Province();
    await Fetch_Sex();
    await Fetch_mary();
    await Fetch_occu();
    await Fetch_bloodgroup();
    // frmAdd.setFieldValue({
    //   birthday: moment(),
    //     });
  }, []);

  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    const txt = result.data;
    setNewPname(txt);
    // console.log("==onFinishEditUser==", txt);
    //
  };

  const Fetch_Sex = async () => {
    const result = await api.get("/Get_group");
    setBloodgroup(result.data);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_sex");
    setSex(result.data);
  };

  const Fetch_occu = async () => {
    const result = await api.get("/Get_occu");
    setOccu(result.data);
  };
  const Fetch_mary = async () => {
    const result = await api.get("/Get_mary");
    setMary(result.data);
  };

  const Fetch_Province = async () => {
    const result = await api.get("/Get_Province");
    setProvince(result.data);
  };

  const Fetch_Aumpure = async (value) => {
    const result = await api.get("/Get_Aumpure", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setAmpure(result.data);
    frmAdd.setFieldsValue({
      amppart: "",
      tmbpart: "",
    });
    setZip("");
    console.log("อำเภอ", result.data);
  };

  const Fetch_Tumbon = async (value) => {
    const result = await api.get("/Get_Tumbon", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon(result.data);
    console.log("ตำบล", result.data);
  };

  const Fetch_Zip = async (value) => {
    const result = await api.get("/Get_Zip", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip(result.data[0]);

    console.log("ไปรษณีย์", result.data);
  };

  // คำนวณอายุ
  const setDate = (dateValue) => {
    const a = moment();

    const b = moment(dateValue, "YYYY-MM-DD");
    setStrBirthday(b);
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    console.log("DateValues------------- ", Age);
    setstrAge(Age);
  };

  const onFinishAdduser = async (value) => {
    // console.log(
    //   "ข้อมูลทั้งหมดใน value",
    //   moment(newStrBirthday).format("YYYY-MM-DD")
    // );
    console.log("value----->", value);

    const result = await api.post(`/Add_guest_donor`, {
      ...value,

      birthday: moment(newStrBirthday).format("YYYY-MM-DD"),
      postcode: newZip,
      image: `${value.cid}.jpg`,
    });
    console.log("Data=========>>", value);

    if (result.data === "OK") {
      success();
      console.log("ok ----->", result.data);
    } else {
      console.log(" no ok", result.data);
    }

    await api.post("/image-upload-donor", image, {
      params: { id: `${value.cid}.jpg` },
    });
  };

  //-------------Upload FILE---------------//
  const [fileType, setFileType] = useState("png");
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

  return (
    <>
      <Layout keyTab="Donor_register">
        <div className="site-card-wrapper">
          <Form onFinish={onFinishAdduser} form={frmAdd}>
            <Row gutter={16} justify="center">
              <Col span={4} style={{ textAlign: "center" }}>
                <Card title="รูปภาพ" bordered={false}>
                  <Form.Item name="image" extra="ใส่หรือไม่ใส่ก็ได้">
                    <Upload
                      name="image"
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
                              //src={`http://localhost:3306/image/${userSelect.pic}`}
                            />
                            {loading}
                            <div style={{ marginTop: 4 }} />
                          </div>
                        )}
                      </Spin>
                    </Upload>
                  </Form.Item>
                </Card>
              </Col>
              <Col span={16}>
                <Card
                  title="เลขประจำตัว"
                  bordered={false}
                  style={{ height: "100%" }}
                >
                  <Form.Item
                    name="cid"
                    label="เลขประจำตัวประชาชน"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      // width: "calc(41% - 8px)",
                      margin: "0 20px",
                    }}
                  >
                    <Input
                      style={{
                        width: "100%",
                        height: "40px",
                        fontSize: "18px",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="passport"
                    label="PASSPORT"
                    rules={[{ required: false }]}
                    style={{
                      display: "inline-block",
                      // width: "calc(41% - 8px)",
                      // margin: "0 60px",
                    }}
                  >
                    <Input
                      style={{
                        width: "100%",
                        height: "40px",
                        fontSize: "18px",
                      }}
                    />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            <br />
            <Row gutter={24} justify="center">
              <Col span={20}>
                <Card title="ข้อมูลส่วนบุคคล" bordered={false}>
                  <Form.Item
                    label="หมู่ของกรุ๊ปเลือด"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      label=""
                      name="group"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(35% - 8px)",
                        margin: "0 20px",
                        textAlign: "center",
                      }}
                    >
                      <Select
                        placeholder="กรุ๊ปเลือด"
                        size="large"
                        style={{ width: "60%" }}
                      >
                        {newBloodgroup.map((item) => (
                          <Option key={item.blood_id} value={item.blood_name}>
                            {item.blood_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form.Item>
                  <br />
                  <Form.Item
                    label="ชื่อ-นามสกุล(ไทย)"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="pname"
                      label="คำนำหน้า(ไทย)"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(20% - 8px)",
                        margin: "0 8px",
                        width: "12%",
                      }}
                    >
                      <Select placeholder="เลือกคำนำหน้า">
                        {newPname.map((item) => (
                          <Option key={item.prefix_id_th} value={item.pname_th}>
                            {item.pname_th}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="fname"
                      label="ชื่อจริง(ไทย)"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(35% - 8px)",
                      }}
                    >
                      <Input placeholder="ชื่อจริง" />
                    </Form.Item>
                    <Form.Item
                      name="lname"
                      label="นามสกุล(ไทย)"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(35% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="นามสกุล" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    label="ชื่อ-นามสกุล(ENG)"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="pname_en"
                      label="คำนำหน้า(ENG)"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(20% - 8px)",
                        margin: "0 8px",
                        width: "12%",
                      }}
                    >
                      <Select placeholder="SELECT PREFIX">
                        {newPname.map((item) => (
                          <Option key={item.prefix_id_en} value={item.pname_en}>
                            {item.pname_en}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="fname_en"
                      label="ชื่อจริง(ENG)"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(35% - 8px)",
                      }}
                    >
                      <Input placeholder="Frist name" />
                    </Form.Item>
                    <Form.Item
                      name="lname_en"
                      label="นามสกุล(ENG)"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(35% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    label="เลือกสถานะทั่วไป"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      label="เพศ"
                      name="sex"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        margin: "0 8px",
                        width: "12%",
                      }}
                    >
                      <Select placeholder="เลือกเพศ">
                        {newSex.map((item) => (
                          <Option key={item.code} value={item.code}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="สถานะ"
                      name="marrystatus"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        margin: "0 8px",
                        width: "12%",
                      }}
                    >
                      <Select placeholder="เลือกสถานะ">
                        {newMary.map((item) => (
                          <Option key={item.status_id} value={item.status_id}>
                            {item.status_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="อาชีพ"
                      name="job"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        margin: "0px 8px",
                        width: "25%",
                      }}
                    >
                      <Select placeholder="เลือกอาชีพ">
                        {newOccu.map((item) => (
                          <Option key={item.occu_id} value={item.occu_id}>
                            {item.occu_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form.Item>
                  <br />
                  <Form.Item
                    label="ช่องทางการติดต่อ"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="phone"
                      label="เบอร์ติดต่อ"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(45% - 8px)",
                        width: "20%",
                      }}
                    >
                      <Input placeholder="โทรศัพท์" />
                    </Form.Item>
                    <Form.Item
                      type="email"
                      name="email"
                      label="Email (อีเมลล์)"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        margin: "0px 8px",
                        width: "25%",
                      }}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="วันเดือนปีเกิด" style={{ marginBottom: 0 }}>
                    <Form.Item
                      name="birthday"
                      // {...config}
                      label="เลือกวันที่เพื่อคำนวณอายุ"
                      // rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 20px)",
                        margin: "0 20px",
                      }}
                    >
                      <DatePicker
                        name="birthday"
                        onChange={setDate}
                        format="DD-MM-YYYY"
                        locale={th_TH}
                        placeholder="เลือกวันเกิด"
                        style={{ width: "15%" }}
                        size="large"
                      />
                      <Input
                        label="อายุ"
                        name="age"
                        style={{
                          display: "inline-block",
                          width: "calc(22% - 8px)",
                          margin: "0 8px",
                          top: "0px",
                          textAlign: "center",
                          width: "10%",
                        }}
                        placeholder="อายุ"
                        value={strAge}
                        disabled
                      />
                    </Form.Item>
                  </Form.Item>
                  <br />
                </Card>
              </Col>
            </Row>
            <br />
            <Row gutter={24} justify="center">
              <Col span={20}>
                <Card title="ที่พักอาศัย" bordered={false}>
                  <Form.Item
                    label="ที่อยู่ปัจจุบัน"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="addrpart"
                      label="บ้านเลขที่"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(15% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="บ้านเลขที่" />
                    </Form.Item>
                    <Form.Item
                      name="soipart"
                      label="ซอย"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(30% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="ซอย" />
                    </Form.Item>
                    <Form.Item
                      name="moopart"
                      label="หมู่"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(20% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="หมู่" />
                    </Form.Item>
                    <Form.Item
                      name="roadpart"
                      label="ถนน"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(30% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="ถนน" />
                    </Form.Item>
                    <Form.Item
                      label="จังหวัด"
                      name="chwpart"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(20% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Select onChange={Fetch_Aumpure}>
                        {newProvince.map((item) => (
                          <Option
                            key={item.PROVINCE_ID}
                            value={item.PROVINCE_ID}
                          >
                            {item.PROVINCE_NAME}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="อำเภอ"
                      name="amppart"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(25% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Select onChange={Fetch_Tumbon}>
                        {newAmpure.map((item) => (
                          <Option key={item.AMPHUR_ID} value={item.AMPHUR_ID}>
                            {item.AMPHUR_NAME}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="sss"
                      label="ตำบล"
                      name="tmbpart"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(25% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Select onChange={Fetch_Zip}>
                        {newTumbon.map((item) => (
                          <Option
                            key={item.DISTRICT_CODE}
                            value={item.DISTRICT_CODE}
                          >
                            {item.DISTRICT_NAME}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {/* <Form.Item> */}
                    <Input
                      label="ไปรษณีย์"
                      name="postcode"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(22% - 8px)",
                        margin: "0 8px",
                        top: "32px",
                        textAlign: "center",
                      }}
                      placeholder="ไปรษณีย์"
                      value={newZip?.zipcode}
                    />
                    {/* </Form.Item> */}
                  </Form.Item>
                </Card>

                <br />
                <div className="btn_add">
                  <style jsx>
                    {`
                      .btn_add {
                        text-align: right;
                        color: green;
                      }
                    `}
                  </style>
                  <Button type="primary" htmlType="submit">
                    ยืนยันข้อมูล
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Layout>
    </>
  );
}

export default Donor_register;

import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import Layout2 from "../components/Layout2";
import api from "../lib/api";
const { Option } = Select;

const config = {
  rules: [
    {
      type: "object",
      message: "กรุณาเลือกวันที่",
    },
  ],
};
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const Guest_regis_donor = () => {
  function success() {
    Modal.success({
      content: "ลงทะเบียนเสร็จสิ้น กรุณาติดต่อห้องธนาคารเลือด",
      onOk: () => {
        Router.push("/");
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

  const [frmAdd] = Form.useForm();

  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    const txt = result.data;
    setNewPname(txt);
    // console.log("==onFinishEditUser==", txt);
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
    console.log(
      "ข้อมูลทั้งหมดใน value",
      moment(newStrBirthday).format("YYYY-MM-DD")
    );
    console.log(value);

    const result = await api.post(`/Add_guest_donor`, {
      birthday: moment(newStrBirthday).format("YYYY-MM-DD"),
      postcode: newZip,
      value,

      // cid: value.cid,
      // passport: value.passport,
      // group: value.group,
      // pname: value.pname,
      // fname: value.fname,
      // lname: value.lname,
      // pname_en: value.pname_en,
      // fname_en: value.fname_en,
      // lname_en: value.lname_en,
      // sex: value.sex,
      // marrystatus: value.marrystatus,
      // job: value.job,
      // phone: value.phone,
      // email: value.email,
      // addrpart: value.addrpart,
      // soipart: value.soipart,
      // moopart: value.moopart,
      // roadpart: value.roadpart,
      // chwpart: value.chwpart,
      // amppart: value.amppart,
      // tmbpart: value.tmbpart,
      // postcode: value.postcode,
    });
    if (result.data === "OK") {
      success();
    } else {
      console.log("status no ok", result.data);
    }
  };

  return (
    <>
      <Layout2>
        <div className="site-card-wrapper">
          <Form onFinish={onFinishAdduser} form={frmAdd}>
            <Row>
              <Col span={6}>
                <Card title="รูปภาพ" bordered={false}>
                  {/* <Form.Item label="img" name="pic">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      // beforeUpload={beforeUpload}
                      // onChange={handleChange}
                      // customRequest={dummyRequest}
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
                  </Form.Item> */}
                  <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="ใส่หรือไม่ใส่ก็ได้"
                  >
                    <Upload name="logo" action="/" listType="picture">
                      <Button icon={<UploadOutlined />}>รูปประจำตัว</Button>
                    </Upload>
                  </Form.Item>
                </Card>
              </Col>
              <Col span={17} offset={1}>
                <Card title="เลขประจำตัว" bordered={false}>
                  <Form.Item
                    name="cid"
                    label="เลขประจำตัวประชาชน"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(41% - 8px)",
                      margin: "0 20px",
                    }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="passport"
                    label="PASSPORT"
                    rules={[{ required: false }]}
                    style={{
                      display: "inline-block",
                      width: "calc(41% - 8px)",
                      margin: "0 60px",
                    }}
                  >
                    <Input />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            <br />
            <Row gutter={24}>
              <Col span={24}>
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
                      <Select placeholder="กรุ๊ปเลือด">
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
                      <Input placeholder="ชื่อจริง" />
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
                      <Input placeholder="นามสกุล" />
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
                        width: "calc(20% - 8px)",
                        margin: "0 8px",
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
                        width: "calc(35% - 8px)",
                        margin: "0 8px",
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
                        width: "calc(35% - 8px)",
                        margin: "0 8px",
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
                        width: "calc(48% - 8px)",
                        margin: "0 8px",
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
                      />
                      <Input
                        label="อายุ"
                        name="age"
                        // rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "calc(22% - 8px)",
                          margin: "0 8px",
                          top: "0px",
                          textAlign: "center",
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
            <Row gutter={24}>
              <Col span={24}>
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
      </Layout2>
    </>
  );
};

export default Guest_regis_donor;

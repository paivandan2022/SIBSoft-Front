import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../lib/api";

const { Option } = Select;
const { TextArea } = Input;
const { Text, Link } = Typography;
const { Header, Footer, Content } = Layout;
const style = { background: "#0092ff", padding: "8px 0" };

const FormSizeDemo = () => {
  const [frmAdd] = Form.useForm();
  const [frmOpen] = Form.useForm();
  const [newDonorlist, setnewDonorlist] = useState({});
  const [newCID, setnewCID] = useState();
  const router = useRouter();
  const [newProvince, setProvince] = useState([]);
  const [newAmpure, setAmpure] = useState([]);
  const [newTumbon, setTumbon] = useState([]);
  const [newZip, setZip] = useState([]);
  const [newProvince_new, setProvince_new] = useState([]);
  const [newAmpure_new, setAmpure_new] = useState([]);
  const [newTumbon_new, setTumbon_new] = useState([]);
  const [newZip_new, setZip_new] = useState([]);
  const [newBloodgroup, setBloodgroup] = useState([]);
  const [newPname, setNewPname] = useState([]);
  const [newSex, setSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [strAge, setstrAge] = useState();
  const [newStrBirthday, setStrBirthday] = useState();

  const onCheckaddress = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      const formData = frmOpen.getFieldsValue();
      console.log("formData", formData);
      frmOpen.setFieldsValue({
        addrpart_new: formData.addrpart,
        soipart_new: formData.soipart,
        moopart_new: formData.moopart,
        roadpart_new: formData.roadpart,
        chwpart_new: formData.chwpart,
        amppart_new: formData.amppart,
        tmbpart_new: formData.tmbpart,
        postcode_new: formData.postcode,
      });
      await Fetch_Aumpure_new(formData.chwpart);
      await Fetch_Tumbon_new(formData.amppart);
      await Fetch_Zip_new(formData.tmbpart);
    } else {
      frmOpen.setFieldsValue({
        addrpart_new: "",
        soipart_new: "",
        moopart_new: "",
        roadpart_new: "",
        chwpart_new: "",
        amppart_new: "",
        tmbpart_new: "",
      });
      setZip_new({
        postcode_new: "",
      });
    }
  };

  const Fetch_frmedit = async (value) => {
    console.log("--------------CID ", value);
    const result = await api.get("/Get_donor_list", {
      params: {
        id: value,
      },
    });

    setnewDonorlist(result.data[0]);
    Fetch_Aumpure(result.data[0].chwpart);
    Fetch_Tumbon(result.data[0].amppart);
    Fetch_Zip(result.data[0].tmbpart);
    console.log("dddddfdf", result.data);

    frmOpen.setFieldsValue({
      ...result.data[0],
      chwpart: Number(result.data[0].chwpart),
      job: Number(result.data[0].job),
      amppart: Number(result.data[0]?.amppart),
      dob: moment(result.data[0]?.dob),
      tmbpart: result.data[0]?.tmbpart,
      age: result.data[0].age,
      marrystatus: Number(result.data[0].marrystatus),
    });
    setZip({
      zipcode: result.data[0].postcode,
    });
  };

  useEffect(async () => {
    if (router?.query?.id) {
      await fetch_pname();
      await Fetch_Province();
      await Fetch_Province_new();
      await Fetch_Sex();
      await Fetch_mary();
      await Fetch_occu();
      await Fetch_bloodgroup();
      await Fetch_frmedit(router?.query?.id);
    }
  }, [router?.query?.id]);

  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    const txt = result.data;
    setNewPname(txt);
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
  // fecth addrees //
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
    setZip("");
  };

  const Fetch_Tumbon = async (value) => {
    const result = await api.get("/Get_Tumbon", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon(result.data);
  };

  const Fetch_Zip = async (value) => {
    const result = await api.get("/Get_Zip", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip(result.data[0]);
  };
  // end fecth addrees //
  // new fecth addrees //
  const Fetch_Province_new = async () => {
    const result = await api.get("/Get_Province_new");
    setProvince_new(result.data);
  };

  const Fetch_Aumpure_new = async (value) => {
    const result = await api.get("/Get_Aumpure_new", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setAmpure_new(result.data);
    setZip_new("");
  };

  const Fetch_Tumbon_new = async (value) => {
    const result = await api.get("/Get_Tumbon_new", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon_new(result.data);
  };

  const Fetch_Zip_new = async (value) => {
    const result = await api.get("/Get_Zip_new", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip_new(result.data[0]);
  };
  //end new fecth addrees //
  // new addrees

  const setDate = (dateValue) => {
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");
    setStrBirthday(b);
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setstrAge(Age);
  };

  const dataSource = [
    {
      key: "1",
      no: "1",
      no_bag: 123,
      date_donor: "22 กุมภาพันธ์ 2565",
      bag: "6 Unit",
      bloodgroup: "AB",
      result: <Tag color="green">ปกติ</Tag>,
      status: "รอนำส่ง",
      address: "ออกหน่วย",
    },
    {
      key: "2",
      no: "2",
      no_bag: 789,
      date_donor: "15 มกราคม 2565",
      bag: "6 Unit",
      bloodgroup: "O",
      result: <Tag color="red">ติดเชื้อ</Tag>,
      status: "กำลังดำเนินการ",
      address: "โรงพยาบาล",
    },
  ];

  const columns = [
    {
      title: "ครั้งที่",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "no_bag",
      key: "no_bag",
    },
    {
      title: "วันที่บริจาคเลือด",
      dataIndex: "date_donor",
      key: "date_donor",
    },
    {
      title: "สถานที่",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "ถุง",
      dataIndex: "bag",
      key: "bag",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bloodgroup",
      key: "bloodgroup",
    },
    {
      title: "ผลการตรวจ",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "address",
    },
  ];

  return (
    <>
      <Layout keyTab="Donor_register">
        <div className="site-card-wrapper">
          <Form onFinish={""} form={frmOpen}>
            <Row gutter={16} justify="center">
              <Col span={4} style={{ textAlign: "center" }}>
                <Card title="รูปภาพ" bordered={false}>
                  <Form.Item name="image" extra="ใส่หรือไม่ใส่ก็ได้">
                    <Image
                      width="40%"
                      src={`http://localhost:3306/image/${
                        newDonorlist?.image
                      }?pathType=2&date=${moment().format("HHmmss")}`}
                    />
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
            <Row gutter={24} justify="center">
              <Col span={20}>
                <Card title="ลงทะเบียนผู้บริจาคเลือด" bordered={false}>
                  <Form.Item
                    label="หมู่ของกรุ๊ปเลือด"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      label=""
                      name="bloodgroup"
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
                {/* ----------------------------------------------------- */}
                <Card title="ที่อยู่ปัจจุบัน" bordered={false}>
                  <Checkbox onChange={onCheckaddress}>
                    <Text underline>ใช้ที่อยู่ตามบัตรประชาชน</Text>
                  </Checkbox>
                  <br />

                  <Form.Item
                    name="addrpart_new"
                    label="บ้านเลขที่"
                    //   rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(15% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="บ้านเลขที่" />
                  </Form.Item>
                  <Form.Item
                    name="soipart_new"
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
                    name="moopart_new"
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
                    name="roadpart_new"
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
                    name="chwpart_new"
                    //   rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(20% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Select onChange={Fetch_Aumpure_new}>
                      {newProvince_new.map((item) => (
                        <Option key={item.PROVINCE_ID} value={item.PROVINCE_ID}>
                          {item.PROVINCE_NAME}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="อำเภอ"
                    name="amppart_new"
                    //   rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(25% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Select onChange={Fetch_Tumbon_new}>
                      {newAmpure_new?.map((item) => (
                        <Option key={item.AMPHUR_ID} value={item.AMPHUR_ID}>
                          {item.AMPHUR_NAME}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="sss"
                    label="ตำบล"
                    name="tmbpart_new"
                    //   rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(25% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Select onChange={Fetch_Zip_new}>
                      {newTumbon_new.map((item) => (
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
                    name="postcode_new"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(22% - 8px)",
                      margin: "0 8px",
                      top: "32px",
                      textAlign: "center",
                    }}
                    placeholder="ไปรษณีย์"
                    value={newZip_new?.zipcode}
                  />
                  {/* </Form.Item> */}
                  <Form.Item
                    name="address_more"
                    label="เพิ่มเติม"
                    // name=""
                    //   rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <TextArea showCount maxLength={100} />
                  </Form.Item>
                </Card>
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
};
export default FormSizeDemo;

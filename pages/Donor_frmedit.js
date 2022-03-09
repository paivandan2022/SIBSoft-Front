import {
  IdcardOutlined,
  PlusCircleTwoTone,
  PrinterOutlined,
  ProfileOutlined,
  RetweetOutlined,
  SearchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
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
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../lib/api";

const { TextArea } = Input;
const { Option } = Select;
const { Text, Link } = Typography;
const { Header, Footer, Content } = Layout;
const style = { background: "#0092ff", padding: "8px 0" };

function Donor_frmedit() {
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
  const [frmAdd] = Form.useForm();
  const [frmOpen] = Form.useForm();
  const [newBloodgroup, setBloodgroup] = useState([]);
  const [newPname, setNewPname] = useState([]);
  const [newSex, setSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [strAge, setstrAge] = useState();
  const [newStrBirthday, setStrBirthday] = useState();

  const onChange = (e) => {
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
    setZip_new({
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

  const Fetch_Province = async () => {
    const result = await api.get("/Get_Province");
    setProvince(result.data);
  };

  const Fetch_Aumpure = async (value) => {
    console.log("cccc", value);
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
    console.log("logggg", value);
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

  // new addrees
  const Fetch_Province_new = async () => {
    const result = await api.get("/Get_Province_new");
    setProvince_new(result.data);
  };

  const Fetch_Aumpure_new = async (value) => {
    console.log("cccc", value);
    const result = await api.get("/Get_Aumpure_new", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setAmpure_new(result.data);

    frmAdd.setFieldsValue({
      amppart: "",
      tmbpart: "",
    });
    setZip_new("");
    console.log("อำเภอ", result.data);
  };

  const Fetch_Tumbon_new = async (value) => {
    console.log("logggg", value);
    const result = await api.get("/Get_Tumbon_new", {
      params: {
        AMPHUR_ID: value,
      },
    });

    setTumbon_new(result.data);
    console.log("ตำบล", result.data);
  };

  const Fetch_Zip_new = async (value) => {
    const result = await api.get("/Get_Zip_new", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip_new(result.data[0]);

    console.log("ไปรษณีย์", result.data);
  };

  // new addrees
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

  const AddressMore = (more) => {
    //   console.log('ที่อยู่เพิ่มเติม:', more.target.value);
  };

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

  return (
    <>
      <style jsx>{`
        .frmedit {
          padding: 10px;
          background: #ececec;
        }
        .gutter-box {
          padding: 8px 0;
          background: #00a0e9;
        }
      `}</style>
      <Layout>
        <Header></Header>
        <Content>
          <Form form={frmOpen}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div className="frmedit">
                <Card title="ลงทะเบียนผู้บริจาคเลือด" bordered={false}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col className="gutter-row" span={8}>
                        <div>
                          <Form.Item
                            label="รหัสผู้บริจาค"
                            // name=""
                            icon={<SearchOutlined />}
                            style={
                              {
                                // display: "inline-block",
                                // width: "calc(30% - 8px)",
                                // margin: "0 8px",
                              }
                            }
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "!",
                            //   },
                            // ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </Col>
                      {/* <Col className="gutter-row" span={1}>
                        <div>
                          <Tooltip title="search">
                            <Button
                              type="dashed"
                              shape="circle"
                              icon={<SearchOutlined />}
                              size="large"
                              style={{
                                // display: "inline-block",
                                // width: "calc(30% - 8px)",
                                margin: "0 8px",
                              }}
                            />
                          </Tooltip>
                        </div>
                      </Col> */}
                      <Col className="gutter-row" span={8}>
                        <div>
                          <Form.Item
                            label="เลขประจำตัวประชาชน"
                            name="cid"
                            // icon={<SearchOutlined />}

                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "!",
                            //   },
                            // ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      </Col>
                      {/* <Col className="gutter-row" span={1}>
                        <div>
                          <Tooltip title="search">
                            <Button
                              type="dashed"
                              shape="circle"
                              icon={<SearchOutlined />}
                              size="large"
                              style={{
                                // display: "inline-block",
                                // width: "calc(30% - 8px)",
                                margin: "0 8px",
                              }}
                            />
                          </Tooltip>
                        </div>
                      </Col> */}
                      <Col className="gutter-row" span={6}>
                        <div>
                          <Image
                            width={250}
                            src={`http://localhost:3306/image/${
                              newDonorlist?.image
                            }?pathType=2&date=${moment().format("HHmmss")}`}
                          />
                        </div>
                      </Col>
                    </Row>
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
                            <Option
                              key={item.prefix_id_th}
                              value={item.pname_th}
                            >
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
                            <Option
                              key={item.prefix_id_en}
                              value={item.pname_en}
                            >
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
                    <div
                      label="วันเดือนปีเกิด"
                      style={{ marginBottom: 0 }}
                    ></div>
                    <Form.Item
                      // {...config}
                      name="dob"
                      label="เลือกวันที่เพื่อคำนวณอายุ"
                      // rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 20px)",
                        margin: "0 20px",
                      }}
                    >
                      <DatePicker onChange={setDate} format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                      name="age"
                      label="อายุ"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "calc(45% - 8px)",
                      }}
                    >
                      <Input placeholder="อายุ" disabled />
                    </Form.Item>

                    <br />
                    <Card title="ที่อยู่ตามบัตรประชาชน" bordered={false}>
                      <Form.Item
                        name="addrpart"
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
                        //   rules={[{ required: true }]}
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
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "calc(25% - 8px)",
                          margin: "0 8px",
                        }}
                      >
                        <Select onChange={Fetch_Tumbon}>
                          {newAmpure?.map((item) => (
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
                        //   rules={[{ required: true }]}
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
                    </Card>
                    <Card title="ที่อยู่ปัจจุบัน" bordered={false}>
                      <Checkbox onChange={onChange}>
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
                        <TextArea
                          showCount
                          maxLength={100}
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Card>
                    <br />
                    <Row>
                      <Space>
                        <Col span={1}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={<IdcardOutlined />}
                          >
                            ค้นหาเครื่องอ่านบัตร
                          </Button>
                        </Col>

                        <Col span={1} offset={15}>
                          <Space>
                            <Button
                              type="danger"
                              shape="round"
                              title="ยกเลิก"
                              icon={<UserDeleteOutlined />}
                            >
                              ยกเลิก
                            </Button>
                            <Button
                              type="warning"
                              shape="round"
                              icon={<RetweetOutlined />}
                            >
                              เริ่มใหม่
                            </Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              shape="round"
                              icon={<PlusCircleTwoTone />}
                            >
                              บันทึกข้อมูล
                            </Button>
                          </Space>
                        </Col>
                      </Space>
                    </Row>
                  </Space>
                </Card>
              </div>
            </Space>
          </Form>
          <div className="frmedit">
            <Card title="ประวัติการบริจาค" bordered={false}>
              <Table dataSource={dataSource} columns={columns} />
            </Card>
          </div>
          <Row justify="end">
            <div>
              <Space>
                <Text underline>หมายเหตุ</Text>
                <Text type="danger">
                  ผลตรวจคือ Salne, Papian, Coombs, Anti-A, Anti-B และ HBsAg,
                  TPHA, HIV,HBA-NAT, ALT, HCV, HIVAg ตามลำดับ
                </Text>
                <Button type="danger" shape="round" icon={<PrinterOutlined />}>
                  พิมพ์ใบสมัคร
                </Button>
                <Button type="primary" shape="round" icon={<ProfileOutlined />}>
                  พิมพ์บัตร
                </Button>
              </Space>
            </div>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default Donor_frmedit;

import {
  IdcardOutlined,
  PlusCircleTwoTone,
  PrinterOutlined,
  ProfileOutlined,
  RetweetOutlined,
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
  const [newDonorlist, setnewDonorlist] = useState([]);
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
  const [newSex, setNewSex] = useState([]);
  const [newOccu, setOccu] = useState([]);
  const [newMary, setMary] = useState([]);
  const [strAge, setstrAge] = useState();
  const [newStrBirthday, setStrBirthday] = useState();

  //------------------------------------//

  const [frmOpen] = Form.useForm();

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
    const result = await api.get("/Get_donor_list_open", {
      params: {
        id: value,
      },
    });
    setnewDonorlist(result.data);
    Fetch_Aumpure(result.data[0].chwpart);
    Fetch_Tumbon(result.data[0].amppart);
    Fetch_Zip(result.data[0].tmbpart);

    frmOpen.setFieldsValue({
      ...result.data[0],
      chwpart: Number(result.data[0].chwpart),
      job: Number(result.data[0].job),
      amppart: Number(result.data[0]?.amppart),
      dob: moment(result.data[0]?.dob),
      tmbpart: result.data[0]?.tmbpart,
      age: result.data[0].age,
      marrystatus: Number(result.data[0].marrystatus),
      sex: result.data[0].sex,
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
    const result = await api.get("/Get_sex");
    setNewSex(result.data);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setBloodgroup(result.data);
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

  const onFinish_Data = async (value) => {
    console.log("Add_donor_frmedit", value);

    const result = await api.put(`/Add_donor_frmedit`, {
      ...value,
      birthday: moment(newStrBirthday).format("YYYY-MM-DD"),
      postcode: newZip,
      postcode_new: newZip_new,
      image: `${value.cid}.jpg`,
    });
  };

  const columns = [
    {
      title: "ครั้งที่",
      dataIndex: "donor_count",
      key: "donor_count",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "Unitnumber_dot",
      key: "Unitnumber_dot",
    },
    {
      title: "วันที่บริจาคเลือด",
      dataIndex: "donor_date",
      key: "donor_date",
    },
    {
      title: "สถานที่",
      dataIndex: "mobname",
      key: "mobname",
    },
    {
      title: "ถุง",
      dataIndex: "donor_type",
      key: "donor_type",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bag_gr",
      key: "bag_gr",
    },
    {
      title: "ผลการตรวจ",
      dataIndex: "blood_result",
      key: "blood_result",
    },
  ];

  return (
    <>
      <style jsx>
        {`
          .frmedit {
            padding: 10px;
            background: #ececec;
          }
          .gutter-box {
            padding: 8px 0;
            background: #00a0e9;
          }
        `}
      </style>
      <Layout>
        <Content>
          <Form form={frmOpen} onFinish={onFinish_Data} Layout="vertical">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div className="frmedit">
                <Card title="ลงทะเบียนผู้บริจาคเลือด" bordered={false}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Row>
                      <Col span={12}>
                        <Card title="ข้อมูลทั่วไป">
                          <Row justify="start">
                            <Form.Item>
                              <Image
                                width="25%"
                                src={`http://localhost:3306/image/${
                                  newDonorlist[0]?.image
                                }?pathType=2&date=${moment().format("HHmmss")}`}
                              />
                            </Form.Item>
                            <br />
                          </Row>
                          <Form.Item
                            name="no"
                            label="เลขประจำตัวผู้บริจาค"
                            style={{
                              display: "inline-block",
                              width: "30%",
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
                          <br />
                          <Form.Item
                            name="cid"
                            label="เลขประจำตัวประชาชน"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                              width: "30%",
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
                          <br />
                          <Form.Item
                            label="หมู่ของกรุ๊ปเลือด"
                            name="bloodgroup"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Select
                              placeholder="กรุ๊ปเลือด"
                              size="large"
                              style={{ width: "65%" }}
                            >
                              {newBloodgroup.map((item) => (
                                <Option
                                  key={item.blood_id}
                                  value={item.blood_name}
                                >
                                  {item.blood_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Card>
                        <Card title="ชื่อ-นามสกุล(ไทย)">
                          <Form.Item
                            name="pname"
                            label="คำนำหน้า(ไทย)"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Select
                              placeholder="เลือกคำนำหน้า"
                              size="large"
                              style={{ width: "100%" }}
                            >
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
                              marginRight: "15px",
                            }}
                          >
                            <Input
                              placeholder="ชื่อจริง"
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="lname"
                            label="นามสกุล(ไทย)"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Input
                              placeholder="นามสกุล"
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                        </Card>
                        <Card title="Fullname">
                          <Form.Item
                            name="pname_en"
                            label="คำนำหน้า(ENG)"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Select
                              placeholder="SELECT PREFIX"
                              size="large"
                              style={{ width: "100%" }}
                            >
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
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Input
                              placeholder="ชื่อจริง"
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="lname_en"
                            label="นามสกุล(ENG)"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Input
                              placeholder="นามสกุล"
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                        </Card>
                        <Card title="วัน-เดือน-ปี เกิด">
                          <Form.Item
                            name="dob"
                            label="วัน-เดือน-ปีเกิด"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <DatePicker
                              onChange={setDate}
                              format="DD-MM-YYYY"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item
                            name="age"
                            label="อายุ"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                            }}
                          >
                            <Input
                              placeholder="อายุ"
                              disabled
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                        </Card>
                      </Col>

                      <Col span={11} offset={1}>
                        <Card title="เลือกสถานะทั่วไป">
                          <Form.Item
                            label="เพศ"
                            name="sex"
                            rules={[{ required: true }]}
                            style={{
                              display: "inline-block",
                              width: "50%",
                              margin: "0 8px",
                            }}
                          >
                            <Select
                              placeholder="เลือกเพศ"
                              size="large"
                              style={{ width: "50%" }}
                            >
                              {newSex.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <br />
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
                            <Select
                              placeholder="เลือกสถานะ"
                              size="large"
                              style={{ width: "50%" }}
                            >
                              {newMary.map((item) => (
                                <Option
                                  key={item.status_id}
                                  value={item.status_id}
                                >
                                  {item.status_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <br />
                          <Form.Item
                            label="อาชีพ"
                            name="job"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                              width: "100%",
                              margin: "0 8px",
                            }}
                          >
                            <Select
                              placeholder="เลือกอาชีพ"
                              size="large"
                              style={{ width: "70%" }}
                            >
                              {newOccu.map((item) => (
                                <Option key={item.occu_id} value={item.occu_id}>
                                  {item.occu_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Card>

                        <br />
                        <Card title="ช่องทางการติดต่อ">
                          <Form.Item
                            name="phone"
                            label="เบอร์ติดต่อ"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                              width: "45%",
                            }}
                          >
                            <Input
                              placeholder="โทรศัพท์"
                              style={{
                                width: "100%",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          </Form.Item>
                          <br />
                          <Form.Item
                            type="email"
                            name="email"
                            label="Email (อีเมลล์)"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                              width: "55%",
                            }}
                          >
                            <Input
                              placeholder="Email"
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
                    <Card title="ที่อยู่ตามบัตรประชาชน" bordered={false}>
                      <Form.Item
                        name="addrpart"
                        label="บ้านเลขที่"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="บ้านเลขที่"
                          disabled
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="soipart"
                        label="ซอย"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="ซอย"
                          disabled
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="moopart"
                        label="หมู่"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="หมู่"
                          disabled
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="roadpart"
                        label="ถนน"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="ถนน"
                          disabled
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="จังหวัด"
                        name="chwpart"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "25%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Aumpure}
                          disabled
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                        >
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
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Tumbon}
                          disabled
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                        >
                          {newAmpure?.map((item) => (
                            <Option key={item.AMPHUR_ID} value={item.AMPHUR_ID}>
                              {item.AMPHUR_NAME}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="ตำบล"
                        name="tmbpart"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Zip}
                          disabled
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                        >
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
                      <Form.Item
                        label="ไปรษณีย์"
                        name="postcode"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          disabled
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                          placeholder="ไปรษณีย์"
                          value={newZip?.zipcode}
                        />
                      </Form.Item>
                    </Card>
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
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="บ้านเลขที่"
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="soipart_new"
                        label="ซอย"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="ซอย"
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="moopart_new"
                        label="หมู่"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="หมู่"
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="roadpart_new"
                        label="ถนน"
                        rules={[{ required: false }]}
                        style={{
                          display: "inline-block",
                          width: "15%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          placeholder="ถนน"
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="จังหวัด"
                        name="chwpart_new"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "25%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Aumpure_new}
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                          placeholder="จังหวัด"
                        >
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
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Tumbon_new}
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                          placeholder="อำเภอ"
                        >
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
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Select
                          onChange={Fetch_Zip_new}
                          style={{
                            width: "100%",
                            fontSize: "18px",
                          }}
                          size="large"
                          placeholder="ตำบล"
                        >
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
                      <Form.Item
                        label="ไปรษณีย์"
                        name="postcode_new"
                        //   rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: "20%",
                          margin: "0 8px",
                        }}
                      >
                        <Input
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "18px",
                          }}
                          placeholder="ไปรษณีย์"
                          value={newZip_new?.zipcode}
                        />
                      </Form.Item>
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

          {/* --------------------------------- */}

          <div className="frmedit">
            <Card title="ประวัติการบริจาค" bordered={false}>
              <Table dataSource={newDonorlist} columns={columns} />
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

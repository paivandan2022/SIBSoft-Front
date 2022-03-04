import { ScanOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../lib/api";

const { Option } = Select;
const { Header, Footer, Content } = Layout;
const { Text } = Typography;

function onChangeprinter(checked) {
  console.log(`switch to ${checked}`);
}
function onChangeSelect(value) {
  //   console.log(`selected ${value}`);
}

function onSearchSelect(val) {
  //   console.log("search:", val);
}

function Donor_frmblood() {
  const router = useRouter();
  const pathData = router.query;
  console.log("อันนี้ๆๆ ๆ ๆ", pathData);
  useEffect(async () => {
    await fetch_Staff();
  }, []);
  const [newStaff, setStaff] = useState([]);
  const [value, setBloodtype] = React.useState(1);

  const onChangeBlood = (e) => {
    console.log("radio checked", e.target.value);
    setBloodtype(e.target.value);
  };

  const fetch_Staff = async () => {
    const result = await api.get("/Get_staff");
    setStaff(result.data);
  };

  return (
    <Layout>
      <Header></Header>
      <Content>
        <div className="container">
          <Card title="ลงทะเบียนบริจาคเลือด">
            <Card type="inner" title="ข้อมูลผู้บริจาค" e>
              <Row>
                <Col span={12}>
                  <Form.Item label="ค้นหาผู้บริจาค">
                    <Input placeholder="หมายเลขผู้บริจาค" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <ScanOutlined
                    style={{ fontSize: "30px", color: "#eb1330" }}
                    // spin
                  />
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Text>รหัสผู้บริจาค :</Text>
                </Col>
                <Col span={6}>
                  <Text strong copyable></Text>
                </Col>
                <Col span={6}>
                  <Text>เลขประจำตัวประชาชน :</Text>
                </Col>
                <Col span={6}>
                  <Text strong copyable></Text>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Text>ชื่อ-นามสกุล :</Text>
                </Col>
                <Col span={6}>
                  <Text strong copyable></Text>
                </Col>
              </Row>
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="ข้อมูลผู้บริจาค"
            >
              <Row>
                <Col />
                วันที่รับบริจาค :
                <Col /> <DatePicker />
                <Col span={5} />
                สถานที่ :
                <Col />{" "}
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
                <Col span={5} />
                บริจาคครั้งที่ :
                <Col />
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChangeSelect}
                  onSearch={onSearchSelect}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                </Select>
              </Row>
              {/* ครั้งที่แล้วบริจาค */}
              <Card>
                <Row>
                  <Form.Item
                    label="ครั้งที่แล้วบริจาค"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Radio.Group onChange={onChangeBlood} value={value}>
                        <Radio value={1}>โลหิตทั่วไป</Radio>
                        <Radio value={2}>เม็ดโลหิตแดง</Radio>
                        <Radio value={3}>เกล็ดโลหิต</Radio>
                        <Radio value={4}>พลาสม่า</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form.Item>
                </Row>
              </Card>
              {/* END ครั้งที่แล้วบริจาค */}
              {/* การบริจาคครั้งที่ผ่านมา */}
              <Card>
                <Row>
                  <Form.Item
                    label="การบริจาคครั้งที่ผ่านมา"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Radio.Group onChange={onChangeBlood} value={value}>
                        <Radio value={5}>ไม่มีปัญหา</Radio>
                        <Radio value={6}>มีปัญหา</Radio>
                      </Radio.Group>
                      <Input placeholder="เพิ่มเติม" />
                    </Form.Item>
                  </Form.Item>
                </Row>
              </Card>
              {/* END การบริจาคครั้งที่ผ่านมา */}
              {/* รายละเอียดการบริจาค */}
              <Card>
                <Row>
                  <Form.Item
                    label="รายละเอียดการบริจาค"
                    style={{ marginBottom: 0 }}
                  ></Form.Item>
                </Row>
                <Row>
                  <Radio.Group onChange={onChangeBlood} value={value}>
                    <Radio value={7}>โลหิตทั่วไป</Radio>
                    <Radio value={8}>เม็ดโลหิตแดง</Radio>
                    <Row>
                      <Radio value={9}>บริจาคให้</Radio>
                      <Input />
                    </Row>
                  </Radio.Group>
                </Row>
              </Card>
              <br></br>
              {/*  END รายละเอียดการบริจาค */}
              <Row>
                <Form.Item label="น้ำหนัก" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="year"
                    // rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                    }}
                  >
                    <Input placeholder="น้ำหนัก" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="ส่วนสูง" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="month"
                    // rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="ส่วนสูง" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="ความดันโลหิต" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="year"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(40% - 8px)",
                    }}
                  >
                    <Input placeholder="" />
                  </Form.Item>
                  <Text>/</Text>
                  <Form.Item
                    name="month"
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(40% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="" />
                  </Form.Item>
                  <Text>มม.ปรอท</Text>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="ชีพจร" style={{ marginBottom: 0 }}>
                  <Row>
                    <Form.Item>
                      <Input></Input>
                    </Form.Item>
                    <Radio.Group onChange={onChangeBlood} value={value}>
                      <Radio value={10}>ปกติ</Radio>
                      <Radio value={11}>ไม่ปกติ</Radio>
                    </Radio.Group>
                  </Row>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item
                  label="เจ้าหน้าที่ทะเบียน"
                  name=""
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    margin: "0 20px",
                    textAlign: "center",
                  }}
                >
                  <Select placeholder="เจ้าหน้าที่">
                    {newStaff.map((item) => (
                      <Option key={item.fullname} value={item.fullname}>
                        {item.fullname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="เจ้าหน้าที่เตรียมถุง"
                  name=""
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    margin: "0 20px",
                    textAlign: "center",
                  }}
                >
                  <Select placeholder="เจ้าหน้าที่">
                    {newStaff.map((item) => (
                      <Option key={item.fullname} value={item.fullname}>
                        {item.fullname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="เจ้าหน้าที่ผู้เจาะเก็บ"
                  name=""
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    margin: "0 20px",
                    textAlign: "center",
                  }}
                >
                  <Select placeholder="เจ้าหน้าที่">
                    {newStaff.map((item) => (
                      <Option key={item.fullname} value={item.fullname}>
                        {item.fullname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="เจ้าหน้าที่เก็บตัวอย่างโลหิต"
                  name=""
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    margin: "0 20px",
                    textAlign: "center",
                  }}
                >
                  <Select placeholder="เจ้าหน้าที่">
                    {newStaff.map((item) => (
                      <Option key={item.fullname} value={item.fullname}>
                        {item.fullname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>{" "}
                <Form.Item
                  label="เจ้าหน้าที่ผู้ตรวจสอบ"
                  name=""
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    margin: "0 20px",
                    textAlign: "center",
                  }}
                >
                  <Select placeholder="เจ้าหน้าที่">
                    {newStaff.map((item) => (
                      <Option key={item.fullname} value={item.fullname}>
                        {item.fullname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>
            </Card>
            <Row justify="end">
              <div className="frmedit">
                <Space>
                  <Text underline>พิมพ์อัตโนมัต</Text>
                  <Switch defaultChecked onChange={onChangeprinter} />
                  <Text type="danger"></Text>
                  <Button type="danger" shape="round">
                    ยกเลิก
                  </Button>
                  <Button type="primary" shape="round">
                    บันทึก
                  </Button>
                </Space>
              </div>
            </Row>
          </Card>

          <style jsx>
            {`
              .container {
                content: "";
                display: block;
                height: 75px;
                margin-top: -20px;
                margin-bottom: 10px;
                // visibility: hidden;
              }
            `}
          </style>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default Donor_frmblood;

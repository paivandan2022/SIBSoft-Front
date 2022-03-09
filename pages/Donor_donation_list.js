import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  PageHeader,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";
const { Text } = Typography;
const { RangePicker } = DatePicker;

const { Option } = Select;

const countDown = () => {
  let secondsToGo = 9;
  const modal = Modal.warning({
    title: "แจ้งเตือนจากระบบ",
    content: `ระบบกำทำการยกเลิกข้อมูลของผู้บริจาคในอีก ${secondsToGo} วินาที`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `ระบบกำทำการยกเลิกข้อมูลของผู้บริจาคในอีก ${secondsToGo} วินาที`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};

const tabListNoTitle = [
  {
    key: "article",
    tab: "วันที่บริจาค",
  },
  {
    key: "app",
    tab: "รายละเอียดการบริจาค",
  },
  {
    key: "project",
    tab: "เจ้าหน้าที่",
  },
];

const contentListNoTitle = {
  article: <p>sss</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const Donor_donation_list = () => {
  const [newDonorlist, setnewDonorlist] = useState([]);
  const [frmSearch] = Form.useForm();
  const Editpopup = (value) => {
    const scW = screen.width / 2;
    const scH = screen.height / 2;
    const appW = 1280;
    const appH = 720;
    const url = "/Donor_frmedit?id=" + value;
    const title = "TEST";
    const callW = appW / 2;
    const callH = appH / 2;

    const str =
      "width=" +
      appW +
      ",height=" +
      appH +
      ",top=" +
      (scH - callH) +
      ",left=" +
      (scW - callW);
    window.open(url, title, str);
  };

  const Bloodpopup = (value) => {
    const scW = screen.width / 2;
    const scH = screen.height / 2;
    const appW = 1280;
    const appH = 720;
    const url = "/Donor_frmblood?id=" + value;
    const title = "TEST";
    const callW = appW / 2;
    const callH = appH / 2;

    const str =
      "width=" +
      appW +
      ",height=" +
      appH +
      ",top=" +
      (scH - callH) +
      ",left=" +
      (scW - callW);
    window.open(url, title, str);
  };

  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "image",

      key: "image",
      render: (text, record) => (
        <Avatar
          src={`http://localhost:3306/image/${text}?pathType=2&date=${moment().format(
            "HHmmss"
          )}`}
          width="30px"
        />
      ),
    },
    {
      title: "เลขประจำตัว",
      dataIndex: "cid",
      key: "cid",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bloodgroup",
      key: "bloodgroup",
    },
    {
      title: "เพศ",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "เบอร์ติดต่อ",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "สถานะ",
      key: "tag",
      render: (text, record) => (
        <Space size="middle">
          <Tag icon={<SyncOutlined spin />} color="processing">
            รอการตรวจสอบประวัติ
          </Tag>
        </Space>
      ),
      dataIndex: "tag",
    },
    {
      title: "การทำงาน",
      key: "Option",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="ดูข้อมูลผู้บริจาค">
            <Button
              style={{ fontSize: "5px", color: "green" }}
              shape="circle"
              icon={<SearchOutlined />}
              // onClick={Editpopup(record.cid)}
              onClick={() => Editpopup(record.cid)}
            />
          </Tooltip>
          <Tooltip title="ลงทะเบียนบริจาคเลือด">
            <Button
              style={{ fontSize: "5px", color: "brue" }}
              shape="circle"
              icon={<EditOutlined />}
              // onClick={Bloodpopup}
              onClick={() => Bloodpopup(record.cid)}
              // onclick={window.open("", "", "width=800,height=600")}
            />

            {/* <EditOutlined style={{ fontSize: "20px", color: "green" }} shape="circle"/> */}
          </Tooltip>
          <Tooltip title="ลบ">
            <Button
              style={{ fontSize: "5px", color: "Tomato" }}
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={countDown}
            />
          </Tooltip>
        </Space>
      ),
      dataIndex: "",
    },
  ];

  const Fetch_Donor_list = async () => {
    const result = await api.get("/Get_donor_list");
    console.log("รายชื่อผู้บริจาค", result.data);
    setnewDonorlist(result.data);
  };

  useEffect(async () => {
    await Fetch_Donor_list();
  }, []);

  return (
    <>
      <Layout keyTab="Donor_donation_list">
        <Row>
          <Col span={20}>
            <PageHeader
              className="site-page-header"
              //   onBack={() => null}
              title="รายการผู้มาบริจาคเลือด"
              subTitle="สำหรับเจ้าหน้าที่"
            />
          </Col>
        </Row>
        <Row></Row>
        <Row justify="end">
          <Col>
            <br />
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <Form
              form={frmSearch}
              layout="inline"
              onFinish={""}
              initialValues={{
                date_Search: [moment(), moment()],
              }}
            >
              <Form.Item name="date_Search" label="ค้นหาจากวันที่">
                <RangePicker
                  placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                  format="DD-MM-YYYY"
                  locale={th_TH}
                />
              </Form.Item>
              <Form.Item
                name="cid_Search"
                label="ค้นหาจากชื่อ-สกุล / เลขประจำตัวประชาชน"
              >
                <Input placeholder="ชื่อ-สกุล / เลขประจำตัวประชาชน" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={3}>
            <Link href="/Donor_register">
              <Button
                type="primary"
                style={{ background: "#08979c", borderColor: "#e6fffb" }}
              >
                ลงทะเบียนผู้มาบริจาค
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <Table columns={columns} dataSource={newDonorlist} />
      </Layout>
    </>
  );
};

export default Donor_donation_list;

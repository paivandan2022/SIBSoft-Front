import {
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Modal,
  PageHeader,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Avatar,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";
import Link from "next/link";

function countDown() {
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
}

function Donor_donation_list() {
  const [newDonorlist, setnewDonorlist] = useState([]);
  const [Modalblood, setModalblood] = useState(false);
  const [Modaledit, setModaledit] = useState(false);

  const showModalblood = () => {
    setModalblood(true);
  };

  const handleOkModalblood = () => {
    setModalblood(false);
  };

  const handleCancelModalblood = () => {
    setModalblood(false);
  };

  const showModaledit = () => {
    setModaledit(true);
  };

  const handleOkModaledit = () => {
    setModaledit(false);
  };

  const handleCancelModaledit = () => {
    setModaledit(false);
  };

  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "image",

      key: "image",
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
              onClick={showModaledit}
            />
            <Modal
              title="ข้อมูลผู้บริจาค"
              visible={Modaledit}
              onOk={handleOkModaledit}
              onCancel={handleCancelModaledit}
              width={1000}
            >
              <p>ตรงนี้</p>
            </Modal>
          </Tooltip>
          <Tooltip title="ลงข้อมูลถุงเลือด">
            <Button
              style={{ fontSize: "5px", color: "brue" }}
              shape="circle"
              icon={<EditOutlined />}
              onClick={showModalblood}
            />
            <Modal
              title="ลงข้อมูลถุงเลือด"
              visible={Modalblood}
              onOk={handleOkModalblood}
              onCancel={handleCancelModalblood}
              width={1000}
            >
              <p>ตรงนี้</p>
            </Modal>
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
              subTitle="..."
            />
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <br />
            <Link href="/Donor_register">
              <Button type="primary">ลงทะเบียนผู้มาบริจาค</Button>
            </Link>
          </Col>
        </Row>
        <Button type="primary"></Button>
        <Table columns={columns} dataSource={newDonorlist} />
      </Layout>
    </>
  );
}

export default Donor_donation_list;

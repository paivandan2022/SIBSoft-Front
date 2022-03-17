import {
  CheckOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SearchOutlined,
  SyncOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
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
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";
import env from "/env.json";
const { TextArea } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const onChangeEject = (e) => {
  console.log("Change:", e.target.value);
};

const mapColorStatus = {
  1: "pink",
  2: "orange",
  3: "#fe6d43",
  4: "green",
  5: "#000",
};

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
const Donor_donation_list = () => {
  const [frmEject] = Form.useForm();

  const [newDonorlist, setnewDonorlist] = useState([]);
  const [frmSearch] = Form.useForm();
  const [ModalvisbleEject, setModalvisbleEject] = useState(false);
  const [userSelect, setUserSelect] = useState({});
  const [password, setPassword] = useState();

  // -------ยกเลิกผู้บริจาค--------- //
  // const modalEject = () => {
  //   setModalvisbleEject(true);
  // };

  const okEject = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formDataEject = frmEject.getFieldsValue();
        console.log(formDataEject);
        const result1 = await api.post(`/Eject_register`, {
          eject_note: formDataEject.eject_note,
          staff: resultLogin.data.fname + " " + resultLogin.data.lname,
          pid: formDataEject.pid,
        });
        setModalvisbleEject(false);
        setPassword();
        window.close();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setModalvisbleEject(false);
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
    setModalvisbleEject(false);
  };

  const cancelEject = () => {
    setModalvisbleEject(false);
  };
  const onEject = async (pid) => {
    const userSelected = newDonorlist.find((item) => item.pid === pid);
    setModalvisbleEject(true);
    setUserSelect(userSelected);
    frmEject.setFieldsValue({
      ...userSelected,
    });
  };

  // -------end ยกเลิกผู้บริจาค--------- //

  //-----------------------------------//
  const onFinishSearch = async (value) => {
    console.log("value------>", value);
    try {
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };
      delete params.date_Search;
      console.log("params", params);

      await Fetch_Donor_list(params);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  //-----------------------------------//

  const Fetch_Donor_list = async (params) => {
    const result = await api.get("/Get_donor_list", { params });
    console.log("รายชื่อผู้บริจาค", result.data);
    setnewDonorlist(result.data);
    // setpid(result.data?.pid);
    // console.log("55555555555555", result.data[0].pid);
  };

  useEffect(async () => {
    // await Fetch_Donor_list_open();
    await Fetch_Donor_list({
      date_start: moment().format("YYYY-MM-DD"),
      date_end: moment().format("YYYY-MM-DD"),
    });
  }, []);

  //-------------------------//
  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "image",

      key: "image",
      render: (text, record) => (
        <Avatar
          src={`${env.PATH_IMG}/image/${text}?pathType=2&date=${moment().format(
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
      dataIndex: "status_name",
      key: "status_name",
      render: (text, record) => (
        <Space size="middle">
          <Tag
            icon={<SyncOutlined spin />}
            color={mapColorStatus[record.status]}
          >
            {text}
          </Tag>
        </Space>
      ),
    },
    {
      title: "การทำงาน",
      key: "Option",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="ดูข้อมูลผู้บริจาค">
            <Button
              style={{ fontSize: "5px", color: "#5DADE2" }}
              shape="circle"
              icon={<SearchOutlined />}
              // onClick={Editpopup(record.cid)}
              onClick={() => Editpopup(record.cid)}
            />
          </Tooltip>
          <Tooltip title="ลงทะเบียนบริจาคเลือด">
            <Button
              style={{ fontSize: "5px", color: "#F5B041" }}
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => Bloodpopup(record.cid)}
            />
          </Tooltip>
          <Tooltip title="ยืนยันข้อมูล">
            <Button
              style={{ fontSize: "5px", color: "green" }}
              shape="circle"
              icon={<CheckOutlined />}
              // onClick={countDown}
            />
          </Tooltip>
          <Tooltip title="ยกเลิกรายชื่อผู้มาบริจาค">
            <Button
              style={{ fontSize: "5px", color: "Tomato" }}
              shape="circle"
              title="ยกเลิก"
              icon={<UserDeleteOutlined />}
              // onClick={modalEject}

              onClick={() => onEject(record.pid)}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  //------------------//

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
              onFinish={onFinishSearch}
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
                name="keyword"
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
            <Button
              type="primary"
              style={{ background: "#08979c", borderColor: "#e6fffb" }}
              href="/Donor_register"
            >
              ลงทะเบียนผู้มาบริจาค
            </Button>
          </Col>
        </Row>
        <br />
        <Card>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={newDonorlist} />
            </Col>
          </Row>
        </Card>
      </Layout>
      <Modal
        title="ยกเลิกรายชื่อผู้มาบริจาค"
        visible={ModalvisbleEject}
        onOk={okEject}
        onCancel={cancelEject}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        // okButtonProps={{ disabled: true }}
        // cancelButtonProps={{ disabled: true }}
      >
        <Space direction="vertical">
          <Form form={frmEject}>
            <Row>
              <Text>ต้องการ </Text>
              <Text type="danger" underline strong>
                ยกเลิก{" "}
              </Text>
              <Text>การบริจาคเลือด &nbsp; </Text>
            </Row>
            <Row>
              <Text underline>ชื่อ-นามสกุล : </Text>
              <Text strong>&nbsp; {userSelect.fullname} &nbsp;</Text>
              <Text underline>เลขประจำตัว : </Text>
              <Text strong>&nbsp; {userSelect.cid}</Text>
            </Row>
            <Text type="secondary">เหตุผลการยกเลิก :</Text>
            <Form.Item name="pid" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="eject_note">
              <TextArea
                showCount
                rows={4}
                placeholder=""
                maxLength={200}
                onChange={onChangeEject}
                style={{ width: "100%" }}
                name="eject_note"
              />
            </Form.Item>
          </Form>
          <Text type="secondary">รหัสผ่าน :</Text>

          <Input.Password
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  );
};

export default Donor_donation_list;

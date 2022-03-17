import {
  DashboardOutlined,
  PoweroffOutlined,
  StockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Modal, Row, Space } from "antd";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { BiDonateBlood, BiFileFind, BiTransfer } from "react-icons/bi";
import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import user from "../lib/user";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Main = ({ children, keyTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    const data = user.getUser();
    setUserData(data);
  }, []);

  const onCollapse = (input) => {
    setCollapsed(input);
  };

  const onclickMenu = (input) => {
    switch (input.key) {
      case "home":
        Router.push("/home");
        break;
      case "dashboard_bloodstcok":
        Router.push("/dashboard_bloodstcok");
        break;
      case "stock_blood":
        Router.push("/stock_blood");
        break;
      case "stock_import_blood":
        Router.push("/stock_import_blood");
        break;
      case "stock_blooddetails":
        Router.push("/stock_blooddetails");
        break;
      case "Donor_register":
        Router.push("/Donor_register");
        break;
      case "Donor_donation_list":
        Router.push("/Donor_donation_list");
        break;
      case "Donor_settingMobile":
        Router.push("/Donor_settingMobile");
        break;
      case "showuser":
        Router.push("/showuser");
        break;
      case "setting":
        Router.push("/setting");
        break;

      default:
        break;
    }
  };
  const onLogout = () => {
    Modal.confirm({
      title: "Are you sure !",
      content: "SIGN OUT",
      onOk: () => {
        Router.push("/");
      },
    });
  };
  useEffect(() => {
    const userDataTemp = user.getUser();
    userDataTemp.name = `${userDataTemp.fname}  ${userDataTemp.lname} ${userDataTemp.pic}`;
    setUserData(userDataTemp);
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <center>
            {/* <div className="logo" /> */}
            <img src="/logo.png" className="logo" />
          </center>

          <Menu
            theme="dark"
            defaultSelectedKeys={[keyTab]}
            mode="inline"
            onClick={onclickMenu}
          >
            {["User", "Admin"].includes(userData?.user_type) && (
              <Menu.Item key="home" icon={<IoHomeOutline />}>
                HOME
              </Menu.Item>
            )}
            {/* <Menu.Item key="main2" icon={<DesktopOutlined />}>
            Dashboard
          </Menu.Item> */}
            <SubMenu key="sub1" icon={<DashboardOutlined />} title="DASHBOARD">
              <Menu.Item key="dashboard_bloodstcok">Blood Stock</Menu.Item>
              <Menu.Item key="1">Blood Request</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<StockOutlined />} title="BLOOD STOCK">
              <Menu.Item key="stock_blood">คลังเลือด</Menu.Item>
              <Menu.Item key="stock_import_blood">รับเลือดเข้าระบบ</Menu.Item>
              <Menu.Item key="stock_blooddetails">รายละเอียดเลือด</Menu.Item>
              <Menu.Item key="2">ปลดเลือด</Menu.Item>
              <Menu.Item key="10">คืนเลือด</Menu.Item>
              <Menu.Item key="4">ฝากเลือด</Menu.Item>
              <Menu.Item key="5">แบ่งถุง</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<BiDonateBlood />} title="DONOR">
              <Menu.Item key="Donor_register">ลงทะเบียน</Menu.Item>
              <Menu.Item key="Donor_donation_list">รายการบริจาคเลือด</Menu.Item>
              <Menu.Item key="8">แยกส่วนประกอบเลือด</Menu.Item>
              <Menu.Item key="9">ลงผลตรวจเลือด</Menu.Item>
              <Menu.Item key="10">นำเข้าผลตรวจกาชาด</Menu.Item>
              <Menu.Item key="12">แฟ้มข้อมูลผู้บริจาค</Menu.Item>
              <Menu.Item key="13">ส่งออกข้อมูลออกหน่วย</Menu.Item>
              <Menu.Item key="14">นำเข้าข้อมูลออกหน่วย</Menu.Item>
              <Menu.Item key="Donor_settingMobile">
                ตั้งค่าหน่วยรับบริจาค
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<BiFileFind />} title="PATIENT">
              <Menu.Item key="15">ลงทะเบียนขอเลือด</Menu.Item>
              <Menu.Item key="16">รายการขอเลือด</Menu.Item>
              <Menu.Item key="17">จ่ายเลือด</Menu.Item>
              <Menu.Item key="18">แฟ้มข้อมูลผู้ป่วย</Menu.Item>
              <Menu.Item key="19">บันทึกปฎิกิริยา</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<BiTransfer />} title="TRANS Service">
              <Menu.Item key="20">จ่ายเลือด</Menu.Item>
              <Menu.Item key="21">ประวัติการจ่ายเลือด</Menu.Item>
              <Menu.Item key="22">คืนเลือด</Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<IoDocumentTextOutline />} title="REPORT">
              <Menu.Item key="23">คลังเลือด : คงคลัง</Menu.Item>
              <Menu.Item key="24">คลังเลือด : ลงรับเลือด</Menu.Item>
              <Menu.Item key="25">คลังเลือด : การ Crossmatch</Menu.Item>
              <Menu.Item key="26">คลังเลือด : จ่ายเลือด</Menu.Item>
              <Menu.Item key="27">คลังเลือด : จ่ายเลือด-คืน</Menu.Item>
              <Menu.Item key="28">คลังเลือด : เลือดหมดอายุ</Menu.Item>
              <Menu.Item key="29">คลังเลือด : ปั่นแยกถุงเลือด</Menu.Item>
              <Menu.Item key="30">คลังเลือด : รับจ่ายถถุงเลือด</Menu.Item>
              <Menu.Item key="31">Daily : การขอเลือด</Menu.Item>
              <Menu.Item key="32">Daily : C/T ratio</Menu.Item>
              <Menu.Item key="33">Daily : C/T ratio Ward</Menu.Item>
              <Menu.Item key="34">Daily : Antibody</Menu.Item>
              <Menu.Item key="35">Daily : สรุปรายการตรวจ</Menu.Item>
              <Menu.Item key="36">Daily : P4P</Menu.Item>
              <Menu.Item key="37">Daily : ตัดเลือดทิ้ง</Menu.Item>
              <Menu.Item key="38">Daily : ทบทวนการใช้เลือด</Menu.Item>
              <Menu.Item key="39">Daily : การฝากเลิอด</Menu.Item>
              <Menu.Item key="40">Daily : การจ่ายเลือด</Menu.Item>
              <Menu.Item key="41">Daily : Turnaround Time</Menu.Item>
              <Menu.Item key="42">Donor : ผลตรวจเลือด</Menu.Item>
              <Menu.Item key="43">Donor : รับเข็ม</Menu.Item>
              <Menu.Item key="44">Donor : ติดเชื้อ</Menu.Item>
              <Menu.Item key="45">Donor : เตือนการบริจาค</Menu.Item>
              <Menu.Item key="46">Donor : ออกหน่วย</Menu.Item>
              <Menu.Item key="47">Donor : หมู่เลือดหายาก</Menu.Item>
            </SubMenu>
            {["SuperAdmin", "Admin"].includes(userData?.user_type) && (
              <Menu.Item key="showuser" icon={<TeamOutlined />}>
                USERS
              </Menu.Item>
            )}
            <SubMenu key="sub8" icon={<IoSettingsOutline />} title="TOOLS">
              <Menu.Item key="48">ข้อมูลโรงพยาบาล</Menu.Item>
              <Menu.Item key="49">ข้อมูลโรงพยาบาล(นอก)</Menu.Item>
              <Menu.Item key="50">ข้อมูล Word</Menu.Item>
              <Menu.Item key="51">ข้อมูลแพทย์</Menu.Item>
              <Menu.Item key="52">ข้อมูลประเภทเลือด</Menu.Item>
              <Menu.Item key="53">ข้อมูลปั่นแยกถุง</Menu.Item>
              <Menu.Item key="54">ข้อมูลน้ำยาถุงเลือด</Menu.Item>
              <Menu.Item key="55">ข้อมูลการตัดเลือดทิ้ง</Menu.Item>
              <Menu.Item key="56">ตั้งค่าการแจ้งเตือน</Menu.Item>
              <Menu.Item key="57">ตั้งค่าการพิมพ์</Menu.Item>
              <Menu.Item key="58">ตั้งค่า Instrument</Menu.Item>
              <Menu.Item key="59">ตั้งค่าการแสดงผล</Menu.Item>
              <Menu.Item key="setting">ตั้งค่าระบบ</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            theme="dark"
            mode="horizontal"
            className="site-layout-background"
            style={{ padding: 0 }}
          >
            <Row justify="end">
              {/* <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col> */}
              <Col span={12} style={{ textAlign: "right" }}>
                <Space>
                  <div>
                    คุณ : {`${userData?.fname} ${userData?.lname}`}{" "}
                    &nbsp;&nbsp;&nbsp;
                    {userData?.pic && (
                      <Avatar
                        size={40}
                        src={`http://localhost:3306/image/${
                          userData?.pic
                        }?date=${moment().format("HHmmss")}`}
                      />
                    )}
                  </div>
                  <PoweroffOutlined
                    style={{ fontSize: "30px", color: "#FF6633" }}
                    onClick={onLogout}
                    type="danger"
                  />
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "0 16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;

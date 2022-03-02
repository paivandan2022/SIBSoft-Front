import { PoweroffOutlined, StockOutlined } from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Modal, Row } from "antd";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import user from "../lib/user";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Main = ({ children, keyTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    const data = user.getUser();
    setUserData(data);
    console.log(data);
  }, []);

  const onCollapse = (input) => {
    console.log(input);
    setCollapsed(input);
  };

  const onclickMenu = (input) => {
    console.log(input.key);
    switch (input.key) {
      case "home":
        Router.push("/home");
        break;
      case "setting":
        Router.push("/setting");
        break;
      case "2":
        Router.push("/2");
        break;
      case "3":
        Router.push("/3");
        break;
      case "4":
        Router.push("/4");
        break;
      case "5":
        Router.push("/5");
        break;
      case "6":
        Router.push("/6");
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
    console.log(userDataTemp);
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <center>
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
            <SubMenu key="sub1" icon={<StockOutlined />} title="SETTING">
              <Menu.Item key="setting">setting</Menu.Item>
              <Menu.Item key="2">Set2</Menu.Item>
              <Menu.Item key="3">Set2</Menu.Item>
              <Menu.Item key="4">Set3</Menu.Item>
              <Menu.Item key="5">Set4</Menu.Item>
              <Menu.Item key="6">Set5</Menu.Item>
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
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={4}></Col>
              <Col span={3}>
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
              </Col>
              <Col span={1}>
                {" "}
                <PoweroffOutlined
                  style={{ fontSize: "30px", color: "#FF6633" }}
                  onClick={onLogout}
                  type="danger"
                />
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

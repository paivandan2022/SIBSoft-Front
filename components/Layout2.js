import { Layout, Menu } from "antd";
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
        Router.push("/");
        break;
      default:
    }
  };

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
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            theme="dark"
            mode="horizontal"
            className="site-layout-background"
            style={{ padding: 0 }}
          >
            <></>
          </Header>
          <Content style={{ margin: "0 16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            ลงทะเบียนผู้บริจาคเลือด
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;

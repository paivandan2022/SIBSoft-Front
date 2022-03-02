import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout, Menu, Modal } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import api from "../lib/api";
import styles from "../styles/Home.module.css";

const { Header, Content, Footer } = Layout;

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    login(values);
  };

  const [signin, setSignin] = useState({});

  const login = async (values) => {
    const result = await api.post(`/signin`, {
      user_name: values.user_name,
      password: values.password,
    });

    if (result.data) {
      localStorage.setItem("user", JSON.stringify(result.data));
      Router.push("/home");
    } else {
      Modal.error({ title: "Invalid User" });
    }

    setSignin(result.data);
  };

  useEffect(() => {
    console.log("useEffect");
    setSignin();
    console.log("setSignin");
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: "5px 0" }}></div>
        <div className="site-layout-content">
          <div className="bg">
            <main className={styles.main}>
              <div>
                <h2 className={styles.title}>Welcome to SignIn Page</h2>
              </div>
              <br></br>
              <br></br>
              {/* <h2><div>{nameHos[0]?.hos_long_name_th}</div></h2>    */}

              <div className={styles.grid}>
                <div className="site-card-border-less-wrapper">
                  <Card title="Sign In" bordered={false} style={{ width: 400 }}>
                    <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="user_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Username!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Username"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          SIGN IN
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default NormalLoginForm;

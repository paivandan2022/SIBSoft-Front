//import { props } from 'props'
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../lib/api";
import styles from "../styles/Home.module.css";

const { Header, Content, Footer } = Layout;

const displayLayout = () => {
  const [nameHos, setnameHos] = useState([]);

  const NameHosApi = async () => {
    const result = await api.get("/namehos");
    setnameHos(result.data[0]);
  };

  useEffect(() => {
    NameHosApi();
    console.log("NameHosApi");
  }, [0]);

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
                <h1 className={styles.title}>
                  Welcome to <a href="#">SIB SOFT!</a>
                </h1>
              </div>

              <h2>
                <div>{nameHos[0]?.hos_long_name_th}</div>
              </h2>

              <div className={styles.grid}>
                <Link href="/Guest_regis_donor">
                  <a className={styles.card}>
                    {/* <h3>Documentation &rarr;</h3> */}
                    <img src="/donate.png" width="100%"></img>
                    <p style={{ textAlign: "center" }}>
                      ลงทะเบียนผู้บริจาคเลือด
                    </p>
                  </a>
                </Link>
                <Link href="/signin">
                  <a className={styles.card}>
                    {/* <h3>Learn &rarr;</h3> */}
                    <img src="/login.png" width="100%"></img>
                    <p style={{ textAlign: "center" }}>
                      เข้าสู่ระบบ สำหรับเจ้าหน้าที่
                    </p>
                  </a>
                </Link>
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
export default displayLayout;

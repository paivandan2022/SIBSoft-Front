import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import api from "../lib/api";

const Main = () => {
  const [blood, setBlood] = useState("");

  const [data, setData] = useState();

  const [ABOCountAll, serABOCountAll] = useState();
  const fetchABO = async () => {
    const result = await api.get("/getabocountall");
    const userNameAll = result.data[0][0];
    console.log("Group ALL ", userNameAll);

    serABOCountAll(result.data[0][0]);
  };

  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await fetchABO();
  }, []);

  //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 3 วินาที
  useEffect(() => {
    setInterval(() => {
      fetchABO();
    }, 3000);
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
  ];

  const dataSource = [
    {
      id: 1,
      name: "XXX",
      qty: 20,
    },
    {
      id: 2,
      name: "XXX2",
      qty: 20,
    },
    {
      name: "XXX",
      qty: 20,
    },
    {
      name: "XXX",
      qty: 20,
    },
    {
      name: "XXX",
      qty: 20,
    },
    {
      name: "XXX",
      qty: 20,
    },
    {
      name: "XXX",
      qty: 20,
    },
  ];

  const column2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "View",
      dataIndex: "",
      key: "view",
      render: (text, record) => <Button>View</Button>,
    },
  ];

  const onClickRow = (record, rowIndex) => {
    console.log(record, rowIndex);
    setData(record);
  };
  return (
    <Layout keyTab="main2">
      <Row>
        <Col span={4}>
          <Button onClick={() => setBlood("A")}>A : {ABOCountAll?.A} </Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("B")}>B : {ABOCountAll?.B}</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("O")}>O : {ABOCountAll?.O}</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("AB")}>AB : {ABOCountAll?.AB}</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("NO")}>
            ไม่ระบุ : {ABOCountAll?.CryO}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Table
            columns={column}
            dataSource={dataSource}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => onClickRow(record, rowIndex), // click row
              };
            }}
          />
        </Col>
        <Col span={11} offset={1}>
          {data && <Table columns={column2} dataSource={[data]} />}
        </Col>
      </Row>
    </Layout>
  );
};

export default Main;

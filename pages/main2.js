import { Button, Col, Row, Table } from "antd";
import { useState } from "react";
import Layout from "../components/layout";
const Main = () => {
  const [blood, setBlood] = useState("");

  const [data, setData] = useState();

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
          <Button onClick={() => setBlood("A")}>A</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("B")}>B</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("C")}>C</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("D")}>D</Button>
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => setBlood("NO")}>NO</Button>
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

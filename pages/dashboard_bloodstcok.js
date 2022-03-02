import { Column, Pie } from "@ant-design/plots";
import { Card, Col, Form, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import api from "../lib/api";

// const Pie = dynamic(
//   () => import("@ant-design/charts").then((charts) => charts.Pie),
//   { ssr: false }
// );

const { Meta } = Card;
const { Text, Link } = Typography;
const { Title } = Typography;
const { Option } = Select;

const dashboard_bloodstcok = () => {
  const [form] = Form.useForm();

  const [dash_blood, setDash_blood] = useState([]);

  const countblood = async () => {
    const result = await api.get("/getabocountall");
    const totalusers = result.data[0][0];
    console.log("Blood ALL===", totalusers);

    setDash_blood(result.data[0][0]);
  };

  useEffect(async () => {
    await countblood();
  }, []);
  //   useEffect(() => {
  //     console.log("test");
  //     setTimeout(() => {
  //       console.log("test 2");
  //     }, 3000);

  //     setInterval(() => {
  //       console.log("test 3");
  //       setData(dayjs().format("DD/MM/YYYY"));
  //     }, 3000);
  //   }, []);

  //// Pie chart ////
  const data = [
    {
      type: "A",
      value: Number(dash_blood?.A),
    },
    {
      type: "B",
      value: Number(dash_blood?.B),
    },
    {
      type: "O",
      value: Number(dash_blood?.O),
    },
    {
      type: "AB",
      value: Number(dash_blood?.AB),
    },
    {
      type: "CryO",
      value: Number(dash_blood?.CryO),
    },
  ];
  const configPie = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  ////////////////
  const dataPie2 = [
    {
      type: "A",
      value: Number(dash_blood?.A),
    },
    {
      type: "B",
      value: Number(dash_blood?.B),
    },
    {
      type: "O",
      value: Number(dash_blood?.O),
    },
    {
      type: "AB",
      value: Number(dash_blood?.AB),
    },
    {
      type: "CryO",
      value: Number(dash_blood?.CryO),
    },
  ];
  const configPie2 = {
    appendPadding: 10,
    data: dataPie2,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  /////////////////////////
  const dataColumn = [
    {
      action: "Group A",
      pv: Number(dash_blood?.A),
    },
    {
      action: "Group B",
      pv: Number(dash_blood?.B),
    },
    {
      action: "Group O",
      pv: Number(dash_blood?.AB),
    },
    {
      action: "Group AB",
      pv: Number(dash_blood?.O),
    },
    {
      action: "ไม่ระบุ",
      pv: Number(dash_blood?.CryO),
    },
  ];
  const config = {
    data: dataColumn,
    xField: "action",
    yField: "pv",
    conversionTag: {},
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <Layout keyTab="dashboard_bloodstcok">
      <>
        <Row name="1" style={{ margin: 5 }}>
          <Col span={4} order={1}>
            <Title level={2}>ยินดีต้อนรับ</Title>
          </Col>
          <Col span={4} order={2}></Col>
          <Col span={4} order={3}></Col>
          <Col span={4} order={4}></Col>
          <Col span={4} order={5}></Col>

          <Col span={4} order={6}></Col>
        </Row>
      </>
      <Row>
        <Col span={8}>
          <Card title="Total Blood Column" bordered={false}>
            <Column {...config} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Blood" bordered={false}>
            <Pie {...configPie} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Blood Pie2">
            <Pie {...configPie2} />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default dashboard_bloodstcok;

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

const home = () => {
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const [userList, setUserList] = useState([]);
  const [userSelect, setUserSelect] = useState({});
  const [pname, setPname] = useState([]);
  const [totaluser, setTotaluser] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const countuser = async () => {
    const result = await api.get("/totaluser");
    const totalusers = result.data[0][0];
    console.log("user ALL===", totalusers);

    setTotaluser(result.data[0][0]);
  };

  useEffect(async () => {
    await countuser();
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

  useEffect(async () => {
    const result = await api.get("/user");
    console.log(result.data);
    setUserList(result.data);
  }, []);

  useEffect(async () => {
    const result = await api.get("/pname");
    console.log(result.data);
    setPname(result.data);
  }, []);

  const onEdit = (id_user) => {
    const userSelected = userList.find((item) => item.id_user === id_user);
    console.log(userSelected);
    setUserSelect(userSelected);
    setIsModalVisible(true);
    // form.setFieldsValue({
    //   pname: userSelected.pname,
    //   fname: userSelected.fname,
    // });
    // form.setFieldsValue({ ...userSelected });
    form.setFieldsValue(userSelected);
  };
  //// Pie chart ////
  const data = [
    {
      type: "SuperAdmin",
      value: Number(totaluser?.SuperAdmin),
    },
    {
      type: "Admin",
      value: Number(totaluser?.Admin),
    },
    {
      type: "User",
      value: Number(totaluser?.User),
    },
    {
      type: "Doctor",
      value: Number(totaluser?.Doctor),
    },
    {
      type: "Nurse",
      value: Number(totaluser?.Nurse),
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
  const data2 = [
    {
      type: "SuperAdmin",
      value: 1,
    },
    {
      type: "Admin",
      value: 5,
    },
    {
      type: "User",
      value: 18,
    },
  ];
  const configPie2 = {
    appendPadding: 10,
    data2,
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
  ////////////////////////////////
  const dataColumn = [
    {
      action: "浏览网站",
      pv: 50000,
    },
    {
      action: "放入购物车",
      pv: 35000,
    },
    {
      action: "生成订单",
      pv: 25000,
    },
    {
      action: "支付订单",
      pv: 15000,
    },
    {
      action: "完成交易",
      pv: 8500,
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

  ////////////////////////////////////
  return (
    <Layout keyTab="home">
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
          <Card title="Total Blood" bordered={false}>
            <Column {...config} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total users" bordered={false}>
            <Pie {...configPie} />
          </Card>
        </Col>
        <Col span={8}>{/* <Card><Pie {...configPie2} /></Card> */}</Col>
      </Row>
    </Layout>
  );
};

export default home;

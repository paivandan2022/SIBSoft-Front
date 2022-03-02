import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  TimePicker,
  Typography,
} from "antd";
import JsBarcode from "jsbarcode";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFileSearch, AiOutlineReload } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { Title } = Typography;
const { Meta } = Card;
const { Search, TextArea } = Input;
const { Option } = Select;

const stock_blood = () => {
  const [size, setSizeBtn] = useState();
  const [groupSelect, setGroupSelect] = useState("");
  const [ABOCountAll, setABOCountAll] = useState();
  const [bloodtypeAll, setbloodtypeAll] = useState();
  const [bloodDetail, setBloodDetail] = useState();
  const [bloodComponent, setbloodComponent] = useState([]);
  const [typeID, setTypeID] = useState();
  const [typeNum, setTypeNum] = useState();
  const [page, setPage] = useState(1);
  const [opttype, setOptType] = useState();
  const [senderBlood, setSenderBlood] = useState();
  const [bagType, setBagType] = useState();
  const [blood_name, setBloodName] = useState();
  const [rh_name, setRhName] = useState();
  const [staff_name, setStaffName] = useState();
  const [blood_liquid, setBloodLiquid] = useState();
  const [componentsUpdate, setComponentsUpdate] = useState();
  const [onChangeDatetypeID, setOnChangeDatetypeID] = useState();
  const [loadingModalEdit, setLoadingModalEdit] = useState(false);
  const [loadingModalView, setLoadingModalView] = useState(false);
  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);
  const [eject_choice, setEject_choice] = useState();
  const [eject_staff, setEject_staff] = useState();

  const [frmEdit] = Form.useForm();
  const [frmEditRadio] = Form.useForm();
  const [frmEject] = Form.useForm();
  const printComponent = useRef(null);
  const ButtonSize = () => {
    setSizeBtn(large);
  };

  //Modal
  const [isModalVisibleView, setisModalVisibleView] = useState(false);
  const [isModalVisibleEdit, setisModalVisibleEdit] = useState(false);
  const [isModalVisibleEject_blood, setIsModalVisibleEject_blood] =
    useState(false);
  // Show modal

  const showModalView = async (value) => {
    setLoadingModalView(true);
    setisModalVisibleView(true);

    // call api

    const result = await api.get(`/GetUnitDetail`, {
      params: {
        blood_id: value,
      },
    });
    // set state
    const bloodDetailView = result.data[0];
    console.log("bloodDetailView===", bloodDetailView);
    setBloodDetail(bloodDetailView);

    setLoadingModalView(false);
  };

  const handleOkView = () => {
    setisModalVisibleView(false);
  };

  const handleCancelView = () => {
    setisModalVisibleView(false);
  };
  //--------------------------------//
  const showModalEdit = async (value) => {
    setLoadingModalEdit(true);
    setisModalVisibleEdit(true);

    await Promise.all([
      LoadOptType(),
      LoadSender(),
      LoadBagType(),
      LoadBloodName(),
      LoadRhName(),
      LoadStaffName(),
      LoadBloodLiquid(),
    ]);
    await GetUnitUpdateDetail(value);
    setLoadingModalEdit(false);
  };

  const handleCancelEdit = () => {
    setisModalVisibleEdit(false);
    frmEdit.resetFields();
  };
  //---------------------------------------//
  const showModalEject_blood = async () => {
    setIsModalVisibleEject_blood(true);
    const result1 = await api.get("/Eject_choice");
    setEject_choice(result1.data);
    const result2 = await api.get("/Eject_staff");
    setEject_staff(result2.data);
  };

  const handleCancelEject_blood = () => {
    setIsModalVisibleEject_blood(false);
    frmEject.resetFields();
  };
  const onFinishEject = async (value) => {
    const result = await api.put(`/UpdateEject`, {
      blood_id: bloodDetail?.[0]?.id,
      unit_no: bloodDetail?.[0]?.unit_no, //778899
      eject_note: value.eject_note,
      eject_staff: value.eject_staff,
    });

    //state
    setIsModalVisibleEject_blood(false);
  };
  //--------------------------------------//
  const LoadOptType = async () => {
    const result = await api.get("/OptionType");
    setOptType(result.data);
  };
  const LoadSender = async () => {
    const result = await api.get("/SenderBlood");
    setSenderBlood(result.data);
  };
  const LoadBagType = async () => {
    const result = await api.get("/BagType");
    setBagType(result.data);
  };
  const LoadBloodName = async () => {
    const result = await api.get("/Blood_Name");
    setBloodName(result.data);
  };
  const LoadRhName = async () => {
    const result = await api.get("/Rh_Name");
    setRhName(result.data[0]);
  };
  const LoadStaffName = async () => {
    const result = await api.get("/Staff_Name");
    setStaffName(result.data);
  };
  const LoadBloodLiquid = async () => {
    const result = await api.get("/Blood_Liquid");
    setBloodLiquid(result.data);
  };
  const onFinishEdit = async (value) => {
    const result = await api.put(`/Update_Stock`, {
      blood_id: value.blood_id,
      type_id: value.type_id,
      hos_id: value.hos_id,
      bag_type_id: value.bag_type_id,
      liquid_id: value.liquid_id,
      date_received: moment(value.date_received).format("YYYY-MM-DD"),
      date_collect: moment(value.date_collect).format("YYYY-MM-DD"),
      date_exp: moment(value.date_exp).format("YYYY-MM-DD"),
      exp_time: moment(value.exp_time).format("HH:mm:ss"),
      blood_group: value.blood_group,
      blood_rh: value.blood_rh,
      volume: value.volume,
      unit_no: value.unit_no,
      note: value.note,
      staff_name: value.staff_name,
    });
    //state
    setisModalVisibleEdit(false);
    showModalView(value.blood_id);
  };
  const fetchABO = async () => {
    const result = await api.get("/Getabocountall");
    const groupblooball = result.data?.[0]?.[0];
    setABOCountAll(groupblooball);
  };
  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await fetchABO();
  }, []);

  ///////////
  const getbloodtype = async () => {
    setbloodComponent();
    setGroupSelect();
    const result = await api.get("/GetComponentCountAll");
    const getbloodtypeall = result.data[0];
    setbloodtypeAll(getbloodtypeall);
  };
  useEffect(async () => {
    await getbloodtype();
  }, []);
  /////////////////////////
  const getbloodtypegroup = async (group) => {
    setbloodComponent();
    setGroupSelect(group);
    const result = await api.get(`/GetComponentCountGroup`, {
      params: {
        group: group,
      },
    });
    const bloodtypesubgroup = result.data[0];
    setbloodtypeAll(bloodtypesubgroup);
  };

  const onClickRow = async (record, rowIndex) => {
    setTypeID(record.type_id);
    setTypeNum(record.type_num);
    setPage(1);
    try {
      let result;
      if (groupSelect) {
        result = await api.get(`/GetUnitReadyTypeGroup`, {
          params: {
            type_id: record.type_id,
            blood_group: groupSelect,
            page: 0,
          },
        });
      } else {
        result = await api.get(`/GetUnitReadyType`, {
          params: {
            type_id: record.type_id,
            page: 0,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(componentAll);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };

  // //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 1000=1วิ วินาที
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchABO();
  //   }, 1000 * 60);
  // }, []);
  /////////////////////////////////////////////////
  const onSearch = async (value) => {
    try {
      let result;
      if (groupSelect) {
        result = await api.get("/GetUnitReadyTypeGroup", {
          params: {
            type_id: typeID,
            blood_group: groupSelect,
            page: (page - 1) * 10,
            value_search: value,
          },
        });
      } else {
        result = await api.get("/GetUnitReadyType", {
          params: {
            type_id: typeID,
            value_search: value,
            page: (page - 1) * 10,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(result.data[0]);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  //////////////////////////////////
  const onChangePagination = async (page, pageSize) => {
    setPage(page);
    try {
      let result;
      if (groupSelect) {
        result = await api.get("/GetUnitReadyTypeGroup", {
          params: {
            type_id: typeID,
            blood_group: groupSelect,
            page: (page - 1) * 10,
          },
        });
      } else {
        result = await api.get("/GetUnitReadyType", {
          params: {
            type_id: typeID,
            page: (page - 1) * 10,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(result.data[0]);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  ////////////////////////////
  const GetUnitUpdateDetail = async (value) => {
    const result = await api.get(`/GetUnitUpdateDetail`, {
      params: {
        id: value,
      },
    });
    const Compo_update = result.data[0][0];
    setComponentsUpdate(Compo_update);

    frmEdit.setFieldsValue({
      ...Compo_update,
      type_id: Number(Compo_update.type_id),
      liquid_id: Number(Compo_update.liquid_id),
      hos_id: Number(Compo_update.hos_id),
      date_received: moment(Compo_update.date_received),
      date_collect: moment(Compo_update.date_collect),
      date_exp: moment(Compo_update.date_received),
      exp_time: moment(Compo_update.exp_time, "HH:mm:ss"),
      volume: Number(Compo_update.volume),
    });
  };

  const onChangeTypeID = async (value) => {
    // call api
    const result = await api.get(`/GetDateTypeExp`, {
      params: { type_id: value },
    });
    const DateTypeExp = result.data[0];

    setOnChangeDatetypeID(DateTypeExp);

    const call_exp = moment(frmEdit.getFieldValue("date_collect")).add(
      DateTypeExp.date_expri,
      "days"
    );

    switch (DateTypeExp.component_type) {
      case 1: //มี group , rh
        setRequireGroup(true);
        setRequireRh(true);
        setDisabledGr(false);
        setDisabledRh(false);
        frmEdit.setFields([
          {
            name: "blood_group",
            value: componentsUpdate.blood_group,
            errors: [],
          },
          {
            name: "blood_rh",
            errors: [],
            value: componentsUpdate.blood_rh,
          },
        ]);
        break;
      case 2: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmEdit.setFields([
          {
            name: "blood_group",
            errors: [],
            value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 3: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmEdit.setFields([
          {
            name: "blood_group",
            errors: [],
            value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 4: //ไม่มี group , rh
        // setSetGr("");
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(true);
        setDisabledRh(true);

        frmEdit.setFields([
          {
            name: "blood_group",
            value: "",
            errors: [],
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;

      default:
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(false);
        break;
    }

    frmEdit.setFieldsValue({
      ...DateTypeExp,
      time_exp: DateTypeExp.date_expri,
      date_exp: call_exp,
    });
  };

  const CalExpdate = (value) => {
    const collect = frmEdit.getFieldValue("time_exp");
    const call_exp = moment(value._d).add(collect, "days");

    frmEdit.setFieldsValue({
      date_exp: call_exp,
    });
  };

  const SetProcess = (str) => {
    const valueForm = frmEditRadio.getFieldsValue();
    if (valueForm.chkProcess === 5) {
      // show modal
      showModalEject_blood();
    } else {
      // call api
    }
  };

  const columnAll = [
    // {
    //   title: "type_id",
    //   dataIndex: "type_id",
    //   key: "type_id",
    // },
    {
      title: "ประเภท",
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      title: "จำนวน",
      dataIndex: "type_num",
      key: "type_num",
    },
  ];

  const columnComponent = [
    {
      title: "รายละเอียด",
      dataIndex: "",
      key: "view",
      render: (text, record) => (
        <AiOutlineFileSearch
          style={{ fontSize: "25px", color: "#FF6633" }}
          onClick={() => showModalView(record.id)}
        />
      ),
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
    },

    {
      title: "หมู่เลือด",
      dataIndex: "abo",
      key: "abo",
    },
    {
      title: "ประเภท",
      dataIndex: "component_type",
      key: "component_type",
    },
    {
      title: "วันที่รับ",
      dataIndex: "date_received",
      key: "date_received",
    },
    {
      title: "วันที่เจาะเก็บ",
      dataIndex: "date_collect",
      key: "date_collect",
    },
    {
      title: "วันที่หมดอายุ",
      dataIndex: "date_exp",
      key: "date_exp",
    },
    {
      title: "วันคงเหลือ",
      dataIndex: "num_exp",
      key: "num_exp",
    },
  ];
  const columnBloodDetail = [
    {
      title: "Order no.",
      dataIndex: "bb_number",
      key: "bb_number",
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "ผู้ทำ",
      dataIndex: "xm_staft",
      key: "xm_staft",
    },
    {
      title: "วันที่",
      dataIndex: "date_xm",
      key: "date_xm",
    },
    {
      title: "สถานะ",
      dataIndex: "xm_status_name",
      key: "xm_status_name",
    },
  ];
  return (
    <>
      <Layout keyTab="stock_blood">
        <Row>
          <Title level={2}>คลังเลือด</Title>
        </Row>
        <Row>
          <Col span={4}>
            <Button
              onClick={() => getbloodtypegroup("A")}
              className="btn-stock_A "
              size="large"
            >
              <Title level={2} className="ant-typography-stock ">
                A : {ABOCountAll?.A}
              </Title>
            </Button>
          </Col>
          <Col span={4} offset={1}>
            <Button
              onClick={() => getbloodtypegroup("B")}
              className="btn-stock_B "
              size="large"
            >
              <Title level={2} className="ant-typography-stock ">
                B : {ABOCountAll?.B}
              </Title>
            </Button>
          </Col>
          <Col span={4} offset={1}>
            <Button
              onClick={() => getbloodtypegroup("O")}
              className="btn-stock_O"
              size="large"
            >
              <Title level={2} className="ant-typography-stock ">
                O : {ABOCountAll?.O}
              </Title>
            </Button>
          </Col>
          <Col span={4} offset={1}>
            <Button
              onClick={() => getbloodtypegroup("AB")}
              className="btn-stock_AB"
              size="large"
            >
              <Title level={2} className="ant-typography-stock ">
                AB : {ABOCountAll?.AB}
              </Title>
            </Button>
          </Col>
          <Col span={4} offset={1}>
            <Button
              onClick={() => getbloodtypegroup(" ")}
              className="btn-stock_CryO"
              size="large"
            >
              <Title level={2} className="ant-typography-stock ">
                ไม่ระบุ : {ABOCountAll?.CryO}
              </Title>
            </Button>
          </Col>
        </Row>
        <Row style={{ margin: 15 }}>
          <Col span={6}>
            <Button onClick={getbloodtype} type="primary" danger>
              <AiOutlineReload style={{ fontSize: "25px", color: "#FFFF" }} />
            </Button>
          </Col>
          <Col span={17} offset={1}>
            {bloodComponent && (
              <Search
                placeholder="Search Unit No."
                allowClear
                enterButton="Search"
                onSearch={onSearch}
                style={{ width: 300 }}
              />
            )}
          </Col>
        </Row>
        <Row style={{ margin: 15 }}>
          <Col span={6}>
            <Table
              rowClassName={(record, index) => {
                return index % 2 === 0 ? "bg-gray" : "";
              }}
              columns={columnAll}
              dataSource={bloodtypeAll} // dataSource = useState ของข้อมูล
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => onClickRow(record, rowIndex), // click row
                };
              }}
              pagination={false}
            />
          </Col>
          <Col span={17} offset={1}>
            {bloodComponent && (
              <Table
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "bg-gray" : "";
                }}
                rowKey="id"
                columns={columnComponent}
                dataSource={bloodComponent}
                pagination={{
                  current: page,
                  total: Number(typeNum || 0),
                  onChange: onChangePagination,
                }}
              />
            )}
          </Col>
        </Row>
      </Layout>
      <Modal
        title="จัดการข้อมูลถุงเลือด"
        visible={isModalVisibleView}
        onOk={handleOkView}
        onCancel={handleCancelView}
        width={800}
        footer={false}
      >
        <Spin spinning={loadingModalView}>
          <Form
            form={frmEditRadio}
            layout="vertical"
            colon={false}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 15 }}
          >
            <Row justify="center">
              <h1>Unit_no : {bloodDetail?.[0]?.unit_no_dot}</h1>
            </Row>
            <Row>
              <Col span={12}>
                <p>ประเภท : {bloodDetail?.[0]?.component_type}</p>
                <p>ผู้บริจาค : {bloodDetail?.[0]?.hos_long_name_th}</p>
                <p>หมู่เลือด : {bloodDetail?.[0]?.abo}</p>
                <p>ปริมาณ : {bloodDetail?.[0]?.blood_volume} ml.</p>
                <p>วันรับ : {bloodDetail?.[0]?.date_received}</p>
                <p>วันเจาะ : {bloodDetail?.[0]?.date_collect}</p>
                <p>วันหมดอายุ : {bloodDetail?.[0]?.date_exp}</p>
              </Col>

              <Col span={12}>
                <Form.Item name="id" hidden={true}></Form.Item>

                <Form.Item name="chkProcess" label={<h4>เลือกการทำงาน</h4>}>
                  {/* <h4>เลือกการทำงาน</h4> */}
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value={1}>ตั้งค่าให้เลือดหมดอายุ</Radio>
                      <Radio value={2}>ยกเลิกการหมดอายุของเลือด</Radio>
                      <Radio value={3}>ลบข้อมูลถุงเลือด</Radio>
                      <Radio value={4}>ตั้งค่าให้เป็นจ่ายแล้ว</Radio>
                      <Radio value={5}>ยกเลิกการใช้เลือดถุงนี้</Radio>
                      <Radio value={6}>ยกเลิกการปลดเลือด/คืนเลือด</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button
                  type="primary"
                  onClick={() => showModalEdit(bloodDetail?.[0]?.id)}
                >
                  แก้ไข
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" onClick={() => SetProcess()}>
                  ยืนยัน
                </Button>
              </Col>
            </Row>
            <Row justify="center ">
              <Col span={12}>
                <div
                  className="site-card-border-less-wrapper"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    className="ant-btnStatus"
                    size={size}
                    type="primary"
                    danger
                  >
                    <h1>{bloodDetail?.[0]?.bl_status_name}</h1>
                  </Button>
                </div>
              </Col>
              <Col span={12}> </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Table
                  columns={columnBloodDetail}
                  dataSource={bloodDetail}
                  rowClassName={(record, index) =>
                    index % 2 === 2 ? "bg-gray" : ""
                  }
                  pagination={false}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <div ref={(el) => (printComponent = el)}>
                <TestPrintComponent
                  barcode={bloodComponent?.[0]?.unit_no}
                  data={bloodComponent}
                />
              </div>
              <ReactToPrint
                trigger={() => <Button type="primary">Print Sticker</Button>}
                content={() => printComponent}
              />
            </Row>
          </Form>
        </Spin>
      </Modal>
      {/* /////////////////////////////////////// */}
      <Modal
        title="Basic Modal"
        visible={isModalVisibleEdit}
        onCancel={handleCancelEdit}
        width={800}
        footer={false}
      >
        <Spin spinning={loadingModalEdit}>
          <Form
            form={frmEdit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinishEdit}
          >
            <Row>
              <Col span={12}>
                <Form.Item name="blood_id" hidden={true}></Form.Item>

                <Form.Item
                  label="ชนิด"
                  name="type_id"
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        const result = await api.get("/CheckUnitEdit", {
                          params: {
                            unit_no: getFieldValue("unit_no"),
                            type_id: value,
                            blood_id: getFieldValue("blood_id"),
                          },
                        });
                        if (result.data?.message === "pass") {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Type Error !!!!"));
                      },
                    }),
                  ]}
                >
                  <Select onChange={onChangeTypeID}>
                    {opttype?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.s_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="รับเลือดจาก" name="hos_id">
                  <Select>
                    {senderBlood?.map((item) => (
                      <Option key={item.hos_id} value={item.hos_id}>
                        {item.hos_shot_name_th}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="ประเภทถุง" name="bag_type_id">
                  <Select>
                    {bagType?.map((item) => (
                      <Option key={item.bagcode} value={item.bagcode}>
                        {item.bagtype}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="น้ำยา" name="liquid_id">
                  <Select>
                    {blood_liquid?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <br />
                <Form.Item label="วันรับ" name="date_received">
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item label="วันเจาะ" name="date_collect">
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    onChange={CalExpdate}
                  />
                </Form.Item>
                <Form.Item label="จำนวนวันหมดอายุ" name="time_exp">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="วันหมดอายุ" name="date_exp">
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item label="เวลาหมดอายุ" name="exp_time">
                  <TimePicker format="HH-mm-ss" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Group"
                  name="blood_group"
                  rules={[
                    {
                      required: requireGroup,
                      message: "โปรดระบุหมู่เลือด",
                    },
                  ]}
                >
                  <Select
                    className="select-group"
                    dropdownClassName="select-group-option"
                    disabled={disabledGr}
                  >
                    {blood_name?.map((item) => (
                      <Option value={item.blood_name}>{item.blood_name}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="rh"
                  name="blood_rh"
                  rules={[
                    {
                      required: requireRh,
                      message: "โปรดระบุ Rh.",
                    },
                  ]}
                >
                  <Select
                    className="select-groupRh"
                    dropdownClassName="select-group-optionRh"
                    disabled={disabledRh}
                  >
                    {rh_name?.map((item) => (
                      <Option value={item.rh_shot_name}>
                        {item.rh_shot_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="ปริมาณ" name="volume">
                  <Input suffix="ml." />
                </Form.Item>
                <Form.Item
                  label={<h2>Unit_no </h2>}
                  name="unit_no"
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        const result = await api.get("/CheckUnitEdit", {
                          params: {
                            unit_no: value,
                            type_id: getFieldValue("type_id"),
                            blood_id: getFieldValue("blood_id"),
                          },
                        });
                        if (result.data?.message === "pass") {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Unit No. Dupicate"));
                      },
                    }),
                  ]}
                >
                  <Input className="ant-input-lg" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="start">
              <Col span={21}>
                <Form.Item label="หมายเหตุ" name="note">
                  <TextArea showCount maxLength={250} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="start">
              <Col span={21}>
                <Form.Item label="ผู้แก้ไข" name="staff_name">
                  <Select style={{ width: "100%" }}>
                    {staff_name?.map((item) => (
                      <Option value={item.staff}>{item.staff}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button htmlType="submit" type="primary">
                  บันทึกข้อมูล
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
      {/* /-----------------------/ */}
      <Modal
        title="Comment"
        visible={isModalVisibleEject_blood}
        onCancel={handleCancelEject_blood}
        footer={false}
      >
        <Form
          form={frmEject}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinishEject}
        >
          {/* <Form.Item name="blood_id" hidden={true}></Form.Item> */}
          <Form.Item label="เหตุผล" name="eject_note">
            <Select>
              {eject_choice?.map((item) => (
                <Option key={item.ejc_name} value={item.ejc_name}>
                  {item.ejc_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="เจ้าหน้าที่" name="eject_staff">
            <Select>
              {eject_staff?.map((item) => (
                <Option key={item.id_user} value={item.full_name}>
                  {item.full_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default stock_blood;
//////// print_sticker
const TestPrintComponent = ({ barcode, data }) => {
  const [barcodeImage, setBarcodeImage] = useState();

  const onClickGenBarcode = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, { format: "CODE128", fontSize: 14 });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeImage(barcodeBase64);
  };

  useEffect(() => {
    if (barcode) {
      onClickGenBarcode(barcode);
    }
  }, [barcode]);

  return (
    <div className="print">
      Test Test {barcode}
      <img src={barcodeImage} />
    </div>
  );
};

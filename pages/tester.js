import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
} from "antd";
import JsBarcode from "jsbarcode";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import Layout from "../components/layout";
import api from "../lib/api";
import user from "../lib/user";

const { Title } = Typography;

const { Search, TextArea } = Input;
const { Option } = Select;

const import_blood = () => {
  const [ABOCountAll, setABOCountAll] = useState();
  const [opttype, setOptType] = useState();
  const [senderBlood, setSenderBlood] = useState();
  const [bagType, setBagType] = useState();
  const [blood_name, setBloodName] = useState();
  const [rh_name, setRhName] = useState();
  const [staff_name, setStaffName] = useState();
  const [blood_liquid, setBloodLiquid] = useState();
  const [onChangeDatetypeID, setOnChangeDatetypeID] = useState();

  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);

  const [frmImport_blood] = Form.useForm();
  const printComponent = useRef(null);

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
  useEffect(async () => {
    await LoadOptType();
    await LoadSender();
    await LoadBagType();
    await LoadBloodName();
    await LoadRhName();
    await LoadStaffName();
    await LoadBloodLiquid();
  }, []);

  const onFinishEdit = async () => {
    const value = frmImport_blood.getFieldsValue();
    console.log("value++++", value);
    // const result = await api.put(`/Update_Stock`, {
    //   blood_id: value.blood_id,
    //   type_id: value.type_id,
    //   hos_id: value.hos_id,
    //   bag_type_id: value.bag_type_id,
    //   liquid_id: value.liquid_id,
    //   date_received: moment(value.date_received).format("YYYY-MM-DD"),
    //   date_collect: moment(value.date_collect).format("YYYY-MM-DD"),
    //   date_exp: moment(value.date_exp).format("YYYY-MM-DD"),
    //   exp_time: moment(value.exp_time).format("HH:mm:ss"),
    //   blood_group: value.blood_group,
    //   blood_rh: value.blood_rh,
    //   volume: value.volume,
    //   unit_no: value.unit_no,
    //   note: value.note,
    //   staff_name: value.staff_name,
    // });
    //state
    // setisModalVisibleEdit(false);
    // showModalView(value.blood_id);
    frmImport_blood.resetFields();
    initstaffname();
  };
  const initstaffname = () => {
    const userDataTemp = user.getUser();
    frmImport_blood.setFieldsValue({
      staff_name: `${userDataTemp.fname}  ${userDataTemp.lname}`,
    });
  };
  useEffect(() => {
    initstaffname();
  }, []);

  const fetchABO = async () => {
    const result = await api.get("/Getabocountall");
    const groupblooball = result.data?.[0]?.[0];
    setABOCountAll(groupblooball);
  };
  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await fetchABO();
  }, []);

  /////////////////////////

  // //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 1000=1วิ วินาที
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchABO();
  //   }, 1000 * 60);
  // }, []);
  /////////////////////////////////////////////////

  ////////////////////////////

  const onChangeTypeID = async (value) => {
    // call api
    const result = await api.get(`/GetDateTypeExp`, {
      params: { type_id: value },
    });
    const DateTypeExp = result.data[0];

    setOnChangeDatetypeID(DateTypeExp);

    const call_exp = moment(frmImport_blood.getFieldValue("date_collect")).add(
      DateTypeExp.date_expri,
      "days"
    );

    switch (DateTypeExp.component_type) {
      case 1: //มี group , rh
        setRequireGroup(true);
        setRequireRh(true);
        setDisabledGr(false);
        setDisabledRh(false);
        frmImport_blood.setFields([
          {
            name: "blood_group",
            //value: componentsUpdate.blood_group,
            errors: [],
          },
          {
            name: "blood_rh",
            errors: [],
            // value: componentsUpdate.blood_rh,
          },
        ]);
        break;
      case 2: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmImport_blood.setFields([
          {
            name: "blood_group",
            errors: [],
            //value: componentsUpdate.blood_group,
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
        frmImport_blood.setFields([
          {
            name: "blood_group",
            errors: [],
            //value: componentsUpdate.blood_group,
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

        frmImport_blood.setFields([
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

    frmImport_blood.setFieldsValue({
      ...DateTypeExp,
      time_exp: DateTypeExp.date_expri,
      date_exp: call_exp,
    });
  };

  const CalExpdate = (value) => {
    const collect = frmImport_blood.getFieldValue("time_exp");
    const call_exp = moment(value._d).add(collect, "days");

    frmImport_blood.setFieldsValue({
      date_exp: call_exp,
    });
  };

  const columnImport = [
    {
      title: "# ",
      dataIndex: "",
      key: "",
    },
    {
      title: "Unit No.",
      dataIndex: "",
      key: "",
    },
    {
      title: "ชนิดเลือด",
      dataIndex: "",
      key: "",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "",
      key: "",
    },
    {
      title: "ปริมาณ",
      dataIndex: "",
      key: "",
    },
    {
      title: "วันที่รับ",
      dataIndex: "",
      key: "",
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "",
      key: "",
    },
    {
      title: "รับมาจาก",
      dataIndex: "",
      key: "",
    },
    {
      title: "สถานะ",
      dataIndex: "",
      key: "",
    },
    {
      title: "วันจำหน่าย",
      dataIndex: "",
      key: "",
    },
    {
      title: "แก้ไข",
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
      title: "ลบ",
      dataIndex: "",
      key: "view",
      render: (text, record) => (
        <AiOutlineFileSearch
          style={{ fontSize: "25px", color: "#FF6633" }}
          onClick={() => showModalView(record.id)}
        />
      ),
    },
  ];
  return (
    <>
      <Layout keyTab="import_blood">
        <Row>
          <Col span={18}>
            <Title level={2}>Import Blood</Title>
          </Col>
          <Col span={6}>
            <Button>A : {ABOCountAll?.A}</Button>
            <Button>B : {ABOCountAll?.B}</Button>
            <Button>O : {ABOCountAll?.O}</Button>
            <Button>AB : {ABOCountAll?.AB}</Button>
            <Button>ไม่ระบุ : {ABOCountAll?.CryO}</Button>
          </Col>
        </Row>

        <Row>
          <Form
            form={frmImport_blood}
            labelCol={{ span: 8 }}
            layout="horizontal"
            onFinish={onFinishEdit}
          >
            <Row justify="center">
              <Col span={8}>
                <Form.Item label="ชนิด" name="type_id">
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
              <Col span={8}>
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
                <Form.Item label={<h2>Unit_no </h2>} name="unit_no">
                  <Input
                    className="ant-input-lg"
                    size="large"
                    onBlur={onFinishEdit}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="ผู้ทำรายการ" name="staff_name">
                  <Select style={{ width: "100%" }}>
                    {staff_name?.map((item) => (
                      <Option value={item.staff}>{item.staff}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="วันที่รับ" name="date_received">
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item label="หมายเหตุ" name="note">
                  <TextArea showCount maxLength={250} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columnImport}></Table>
          </Col>
        </Row>
      </Layout>

      {/* /-----------------------/ */}
    </>
  );
};

export default import_blood;
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

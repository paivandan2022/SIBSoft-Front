import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import { internalIpV4 } from "internal-ip";
import JsBarcode from "jsbarcode";
import moment from "moment";
import "moment/locale/th";
import os from "os";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Layout from "../components/layout";
import api from "../lib/api";
import user from "../lib/user";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const import_blood = ({ computerName }) => {
  const [ABOCountAll, setABOCountAll] = useState();
  const [opttype, setOptType] = useState();
  const [senderBlood, setSenderBlood] = useState();
  const [bagType, setBagType] = useState();
  const [blood_name, setBloodName] = useState();
  const [rh_name, setRhName] = useState();
  const [staff_name, setStaffName] = useState();
  const [blood_liquid, setBloodLiquid] = useState();
  const [onChangeDatetypeID, setOnChangeDatetypeID] = useState();
  const [listimport, setListimport] = useState();
  const [sumlists, setSumlists] = useState();

  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);

  const [password, setPassword] = useState();
  const [isModalVisiblePassword, setIsModalVisiblePassword] = useState(false);

  const [frmImport_blood] = Form.useForm();
  const printComponent = useRef(null);

  const [isModalVisibleView, setisModalVisibleView] = useState(false);

  const showModalView = async () => {
    setisModalVisibleView(true);
    const ids = listimport?.map((item) => item.id);
    // call api
    const result = await api.get(`/Sum_blood`, {
      params: {
        ids: ids,
      },
    });
    // set state
    setSumlists(result.data);
    console.log("setSumlists", result.data);
  };
  const column_Sum = [
    {
      title: "ประเภท",
      dataIndex: "Type",
      key: "Type",
      width: "15%",
    },
    {
      title: "จำนวน",
      dataIndex: "Type_num",
      key: "Type_num",
      align: "center",
      width: "20%",
    },
  ];
  const handleOkView = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin);
    if (resultLogin.data) {
      const ip = await internalIpV4();
      const ids = listimport.map((item) => item.id);
      console.log("IPV4", ip);
      console.log("computerName", computerName);

      const result = await api.put(`/Update_Import_Blood`, {
        ids: ids,
        staff: resultLogin.data.fname + " " + resultLogin.data.lname,
        // computerName,
      });
      console.log("===result", result);
      setisModalVisibleView(false);
      setIsModalVisiblePassword(false);
      setPassword();
      fetchList();
    } else {
      Modal.error({ title: "Password invalid" });
    }
  };

  const handleCancelView = () => {
    setisModalVisibleView(false);
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
  useEffect(async () => {
    await LoadOptType();
    await LoadSender();
    await LoadBagType();
    await LoadBloodName();
    await LoadRhName();
    await LoadStaffName();
    await LoadBloodLiquid();
  }, []);

  const Refresh = () => {
    frmImport_blood.resetFields();
  };

  const onFinishInsert = async (value) => {
    const ip_init = await internalIpV4();
    try {
      const result = await api.post(`/Insert_Import_Blood`, {
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
        computer_name: computerName,
        ip: ip_init,
      });
      console.log("result---", result);

      if (result?.data?.status === "error") {
        Modal.error({ title: <h2>มีถุงเลือดนี้แล้ว</h2> });
      }
      frmImport_blood.setFieldsValue({
        unit_no: " ",
      });
      initstaffname();
      document.getElementById("unit_no").focus();
      fetchList();
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };

  // const onFinishUpdate = async () => {
  //   Modal.confirm({
  //     title: "Are you sure !",
  //     content: "Save Data",
  //     onOk: async () => {
  //       const ip = await internalIpV4();
  //       const ids = listimport.map((item) => item.id);
  //       console.log("ids", ids);
  //       console.log("IPV4", ip);
  //       console.log("computerName", computerName);

  //       const result = await api.put(`/Update_Import_Blood`, {
  //         ids: ids,
  //         //ip,
  //         // computerName,
  //       });
  //       console.log("===result", result);
  //       fetchList();
  //     },
  //   });
  // };

  const fetchList = async () => {
    const ip = await internalIpV4();
    const result = await api.get(`/Select_Import_Blood`, {
      params: { ip, computerName },
    });
    const fetchList_blood = result.data;
    setListimport(fetchList_blood);
    console.log(ip);
    console.log(computerName);
    console.log("===fetchList", result.data);
  };

  const initstaffname = () => {
    const userDataTemp = user.getUser();
    frmImport_blood.setFieldsValue({
      staff_name: `${userDataTemp.fname}  ${userDataTemp.lname}`,
    });
  };
  useEffect(() => {
    initstaffname();
    fetchList();
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
  const Delete_data = async (value) => {
    Modal.confirm({
      title: "Are you sure !",
      content: "Delete Record",
      onOk: async () => {
        const result = await api.delete(`/Delete_Import_Blood`, {
          params: { id: value },
        });
        fetchList();
      },
    });
  };
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
      title: "ลำดับ",
      dataIndex: "",
      key: "",
      align: "center",
      width: 90,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
    },
    {
      title: "ชนิดเลือด",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "blood_group",
      key: "",
      align: "center",
      render: (text, record, index) => {
        return `${record.blood_group}${record.blood_rh}`;
      },
    },
    {
      title: "ปริมาณ",
      dataIndex: "blood_value",
      key: "blood_value",
      align: "center",
    },
    {
      title: "วันที่รับ",
      dataIndex: "unit_receive",
      key: "unit_receive",
      align: "center",
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "unit_exp",
      key: "unit_exp",
      align: "center",
    },
    {
      title: "รับมาจาก",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "status_name",
      key: "status_name",
      align: "center",
    },
    {
      title: "ลบ",
      dataIndex: "",
      key: "delete",
      align: "center",
      width: 100,
      render: (text, record) => (
        <Button type="text">
          <AiOutlineDelete
            style={{ fontSize: "25px", color: "#FF6633" }}
            onClick={() => Delete_data(record.id)}
          />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="stock_import_blood">
        <Row>
          <Col span={18}>
            <Title level={2}>Import Blood</Title>
          </Col>

          <Col span={6}>
            <Space>
              <Button className="btn-color-a">A : {ABOCountAll?.A}</Button>
              <Button className="btn-color-b">B : {ABOCountAll?.B}</Button>
              <Button className="btn-color-o">O : {ABOCountAll?.O}</Button>
              <Button className="btn-color-ab">AB : {ABOCountAll?.AB}</Button>
              <Button className="btn-color-cryo">
                ไม่ระบุ : {ABOCountAll?.CryO}
              </Button>
            </Space>
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Form
            form={frmImport_blood}
            labelCol={{ span: 8 }}
            layout="horizontal"
            onFinish={onFinishInsert}
            initialValues={{
              date_received: moment(),
              exp_time: moment("00:00:00", "HH:mm:ss"),
            }}
          >
            <Row justify="center">
              <Col span={8}>
                <Form.Item label="ชนิด" name="type_id">
                  <Select
                    onChange={onChangeTypeID}
                    placeholder="ชนิด"
                    size="large"
                    style={{ width: "65%" }}
                  >
                    {opttype?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.s_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="รับเลือดจาก" name="hos_id">
                  <Select
                    placeholder="รับเลือดจาก"
                    size="large"
                    style={{ width: "65%" }}
                  >
                    {senderBlood?.map((item) => (
                      <Option key={item.hos_id} value={item.hos_id}>
                        {item.hos_shot_name_th}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="ประเภทถุง" name="bag_type_id">
                  <Select size="large" style={{ width: "65%" }}>
                    {bagType?.map((item) => (
                      <Option key={item.bagcode} value={item.bagcode}>
                        {item.bagtype}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="น้ำยา" name="liquid_id">
                  <Select size="large" style={{ width: "65%" }}>
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
                    style={{ width: "65%" }}
                    format="DD-MM-YYYY"
                    onChange={CalExpdate}
                    locale={th_TH}
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="จำนวนวันหมดอายุ" name="time_exp">
                  <Input style={{ width: "30%" }} suffix="วัน" disabled />
                </Form.Item>
                <Form.Item label="วันหมดอายุ" name="date_exp">
                  <DatePicker
                    style={{ width: "65%" }}
                    format="DD-MM-YYYY"
                    locale={th_TH}
                    size="large"
                  />
                </Form.Item>
                <Form.Item label="เวลาหมดอายุ" name="exp_time">
                  <TimePicker style={{ width: "65%" }} size="large" />
                </Form.Item>
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                <Form.Item
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
                    size="large"
                    style={{ width: "65%" }}
                    placeholder="Group"
                  >
                    {blood_name?.map((item) => (
                      <Option key={item.blood_name} value={item.blood_name}>
                        {item.blood_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
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
                    size="large"
                    style={{ width: "50%" }}
                    placeholder="rh"
                  >
                    {rh_name?.map((item) => (
                      <Option key={item.rh_shot_name} value={item.rh_shot_name}>
                        {item.rh_shot_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="volume">
                  <Input
                    style={{ width: "50%" }}
                    prefix="ปริมาณ : "
                    suffix="ml."
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  // label={<h2>เลขที่ถุงเลือด</h2>}
                  name="unit_no"
                  id="unit_no"
                >
                  <Input
                    className="ant-input-lg"
                    style={{ width: "75%" }}
                    size="large"
                    placeholder="เลขที่ถุงเลือด"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="ผู้ทำรายการ" name="staff_name">
                  <Select style={{ width: "65%" }} size="large">
                    {staff_name?.map((item) => (
                      <Option value={item.staff}>{item.staff}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="วันที่รับ" name="date_received">
                  <DatePicker
                    style={{ width: "65%" }}
                    format="DD-MM-YYYY"
                    locale={th_TH}
                    size="large"
                  />
                </Form.Item>

                <Form.Item label="หมายเหตุ" name="note">
                  <TextArea
                    style={{ height: 120, width: "75%" }}
                    showCount
                    maxLength={250}
                  />
                </Form.Item>
                <br />
                <Row justify="end">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ display: "none" }}
                    >
                      OK
                    </Button>
                    <Button type="primary" danger onClick={Refresh}>
                      Clear
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
        <Row justify="center">
          <Col span={24}>
            <Table
              columns={columnImport}
              dataSource={listimport}
              bordered
              pagination={false}
              scroll={{ y: 700 }}
            />
          </Col>
        </Row>
        <br />
        <Row justify="end">
          <Button type="primary" onClick={showModalView}>
            ยืนยัน
          </Button>
        </Row>
      </Layout>
      {/* /-----------------------/ */}
      <Modal
        title="ตรวจสอบ"
        visible={isModalVisibleView}
        onOk={() => setIsModalVisiblePassword(true)}
        onCancel={handleCancelView}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <Table
          columns={column_Sum}
          dataSource={sumlists}
          bordered
          pagination={false}
        />
      </Modal>

      <Modal
        title="กรอก Password "
        visible={isModalVisiblePassword}
        onOk={handleOkView}
        onCancel={() => {
          setIsModalVisiblePassword(false), setPassword();
        }}
        okButtonProps={{
          disabled: !password,
        }}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </Modal>
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

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}

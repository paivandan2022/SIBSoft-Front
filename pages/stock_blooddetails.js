import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
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
import { AiOutlineFileSearch } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { Title } = Typography;
const { Search, TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const stock_blooddetails = () => {
  const [size, setSizeBtn] = useState();
  const [ABOCountAll, setABOCountAll] = useState();
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

  const [isSearch, setIsSearch] = useState(false);
  //**************--stock_blooddetails--*******************//
  const [countAllStatus, setCountAllStatus] = useState();
  const [compo_status, setCompo_status] = useState();
  const [statusSelect, setStatusSelect] = useState();
  const [stock_status_detail, setStock_status_detail] = useState();

  const [frmEdit] = Form.useForm();
  const [frmEditRadio] = Form.useForm();
  const [frmSearch] = Form.useForm();
  const printComponent = useRef(null);
  const ButtonSize = () => {
    setSizeBtn(large);
  };

  //Modal
  const [isModalVisibleView, setisModalVisibleView] = useState(false);
  const [isModalVisibleEdit, setisModalVisibleEdit] = useState(false);
  const [isModalVisibleComment, setIsModalVisibleComment] = useState(false);
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

  const handleOkEdit = () => {
    setisModalVisibleEdit(false);
  };
  const handleCancelEdit = () => {
    setisModalVisibleEdit(false);
    frmEdit.resetFields();
  };

  const showModalComment = () => {
    setIsModalVisibleComment(true);
  };

  const handleOkComment = () => {
    setIsModalVisibleComment(false);
  };

  const handleCancelComment = () => {
    setIsModalVisibleComment(false);
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
    //api
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

  //////////////////////////////////
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
      showModalComment();
    } else {
      // call api
    }
  };
  //**************--stock_blooddetails--*******************//
  const Reset_all = () => {
    setCompo_status();
    setStock_status_detail();
  };
  const ClearSearch = () => {
    frmSearch.resetFields();
    setCompo_status();
    setStock_status_detail();
    CountStatus();
    setIsSearch(false);
  };
  const CountStatus = async () => {
    setCompo_status();
    setStock_status_detail();
    const result = await api.get(`/Stock_Detail_status`);
    const CountStatus_all = result.data[0];
    setCountAllStatus(CountStatus_all);
    console.log("CountStatus_all===>", CountStatus_all);
  };
  useEffect(async () => {
    await CountStatus();
  }, []);

  const GetCompo = async (status_id) => {
    setStock_status_detail();
    setStatusSelect(status_id);
    const result = await api.get(`/Stock_Detail_Component`, {
      params: {
        status_id: status_id,
      },
    });
    const Getcompo_status = result.data[0];
    setCompo_status(Getcompo_status);
  };
  //-------------------------------------------//
  const onClickRow = async (record) => {
    setStock_status_detail();
    setTypeID(record.type_id);
    setTypeNum(record.type_num);
    setPage(1);
    console.log("record-----12", record);
    let params = {};

    const formValue = frmSearch.getFieldsValue();
    if (formValue?.unit_no || formValue.date_type || formValue?.antibody) {
      params = {
        ...formValue,
        date_start: moment(formValue.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(formValue.date_Search[1]).format("YYYY-MM-DD"),
        status_id: statusSelect,
      };
      delete params.date_Search;
    }

    console.log("=====", params);

    console.log(formValue);

    try {
      let result;

      if (statusSelect) {
        result = await api.get(`/Stock_Detail_unit`, {
          params: {
            type_id: record.type_id,
            status_id: statusSelect,
            page: 0,
            ...params,
          },
        });
      } else {
        result = await api.get(`/Stock_Detail_unit`, {
          params: {
            type_id: record.type_id,
            page: 0,
            ...params,
          },
        });
      }
      const Stock_status_all = result.data[0];
      setStock_status_detail(Stock_status_all);
      console.log("Stock_status_all----->", Stock_status_all);
    } catch (error) {
      Modal.error({ title: "Error", error: error.message });
    }
  };
  //-------------------------------------------//
  const onChangePagination = async (page, pageSize) => {
    setPage(page);

    let params = {};

    const formValue = frmSearch.getFieldsValue();
    if (formValue?.unit_no || formValue.date_type || formValue?.antibody) {
      params = {
        ...formValue,
        date_start: moment(formValue.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(formValue.date_Search[1]).format("YYYY-MM-DD"),
        status_id: statusSelect,
      };
      delete params.date_Search;
    }

    try {
      let result;
      if (statusSelect) {
        result = await api.get("/Stock_Detail_unit", {
          params: {
            type_id: typeID,
            status_id: statusSelect,
            page: (page - 1) * 10,
            ...params,
          },
        });
      } else {
        result = await api.get("/Stock_Detail_unit", {
          params: {
            type_id: typeID,
            page: (page - 1) * 10,
            ...params,
          },
        });
      }
      const Stock_status_all = result.data[0];
      setStock_status_detail(Stock_status_all);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  //-------------------------------------------//
  const onFinishSearch = async (value) => {
    try {
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };
      delete params.date_Search;

      const result1 = await api.get(`/Stock_Detail_status`, { params });
      setCountAllStatus(result1.data[0]);

      if (!(value?.date_type || value?.unit_no || value?.antibody)) {
        const result2 = await api.get(`/Stock_Detail_Component`, {
          params,
        });
        setCompo_status(result2.data[0]);

        const result3 = await api.get(`/Stock_Detail_unit`, {
          params,
        });
        setStock_status_detail(result3.data[0]);
      } else {
        setCompo_status(null);
        setStock_status_detail(null);
      }

      setIsSearch(true);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };

  const onClickSearch = async (value) => {
    console.log("---- กดปุ่ม 2 --------->", isSearch);
    setStatusSelect(value.status_id);
    try {
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };

      delete params.date_Search;
      const result2 = await api.get(`/Stock_Detail_Component`, {
        params,
        // params: { status_id: 1 },
      });
      setCompo_status(result2.data[0]);

      // const result3 = await api.get(`/Stock_Detail_unit`, {
      //   params,
      // });
      // setStock_status_detail(result3.data[0]);
      setStock_status_detail(null);
    } catch (error) {
      Modal.error({ title: "Error", error: error.message });
    }
  };

  // const onClickComponent = async (value) => {
  //   console.log("---- กดปุ่ม 2 --------->", value);
  //   try {
  //     const params = {
  //       ...value,
  //       date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
  //       date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
  //     };

  //     delete params.date_Search;

  //     const result3 = await api.get(`/Stock_Detail_unit`, {
  //       params,
  //     });
  //     setStock_status_detail(result3.data[0]);
  //   } catch (error) {
  //     Modal.error({ title: "Error", error: error.message });
  //   }
  // };

  //**************--stock_blooddetails--*******************//

  const columnComponent = [
    {
      title: "View",
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
      title: "unit_no",
      dataIndex: "unit_no",
      key: "unit_no",
    },
    {
      title: "abo",
      dataIndex: "abo",
      key: "abo",
    },
    {
      title: "component_type",
      dataIndex: "component_type",
      key: "component_type",
    },
    {
      title: "date_received",
      dataIndex: "date_received",
      key: "date_received",
    },
    {
      title: "date_collect",
      dataIndex: "date_collect",
      key: "date_collect",
    },
    {
      title: "date_exp",
      dataIndex: "date_exp",
      key: "date_exp",
    },
    {
      title: "num_exp",
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
      <Layout keyTab="stock_blooddetails">
        <Row>
          <Col span={18}>
            <Title level={2}>รายละเอียดเลือด</Title>
          </Col>

          <Col span={6}>
            <Button>A : {ABOCountAll?.A}</Button>
            <Button>B : {ABOCountAll?.B}</Button>
            <Button>O : {ABOCountAll?.O}</Button>
            <Button>AB : {ABOCountAll?.AB}</Button>
            <Button>ไม่ระบุ : {ABOCountAll?.CryO}</Button>
          </Col>
        </Row>
        <Row style={{ margin: 15 }} justify="start">
          <Card className="card-stock_blooddetails">
            <Col span={24}>
              <Form
                form={frmSearch}
                layout="inline"
                onFinish={onFinishSearch}
                initialValues={{
                  date_Search: [moment(), moment()],
                }}
              >
                <Form.Item name="date_type">
                  <Radio.Group>
                    <Radio value="date_collect">วันที่เจาะ</Radio>
                    <Radio value="date_receive">วันที่รับ</Radio>
                    <Radio value="date_expired">วันหมดอายุ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="date_Search">
                  <RangePicker
                    placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                    format="DD-MM-YYYY"
                  />
                </Form.Item>
                <Form.Item name="unit_no">
                  <Input placeholder="Unit No" />
                </Form.Item>
                <Form.Item name="antibody">
                  <Input placeholder="Antibody / Antigen" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" danger onClick={ClearSearch}>
                    Clear
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Card>
        </Row>
        <Row>
          <Col xxl={4} lg={5}>
            <Card className="card-stock_blooddetails-all">
              <Form>
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A1 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "1",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("1")
                  }
                >
                  ปกติ ({countAllStatus?.[0]?.A1 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A3 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "3",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("3")
                  }
                >
                  Crossmatch ({countAllStatus?.[0]?.A3 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A4 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "4",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("4")
                  }
                >
                  จ่าย ({countAllStatus?.[0]?.A4 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A11 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "11",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("11")
                  }
                >
                  ฝากเลือด ({countAllStatus?.[0]?.A11 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A14 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "14",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("14")
                  }
                >
                  จำหน่าย ({countAllStatus?.[0]?.A14 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A6 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "6",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("6")
                  }
                >
                  หมดอายุ ({countAllStatus?.[0]?.A6 || 0})
                </Button>
                <hr />
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A9 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "9",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () => GetCompo("9")
                  }
                >
                  แบ่งถุง ({countAllStatus?.[0]?.A9 || 0})
                </Button>
                <br />
                <br />
                <br />
                <br />
                <Button
                  onClick={() => " "}
                  className="btn-stock_blooddetails"
                  size="large"
                >
                  ยังไม่ผ่านกาตรวจ (0000)
                </Button>
                <hr />
                <Button
                  onClick={() => " "}
                  className="btn-stock_blooddetails"
                  size="large"
                >
                  ติดเชื้อ (0000)
                </Button>
                <hr />
                <Button
                  onClick={() => " "}
                  className="btn-stock_blooddetails"
                  size="large"
                >
                  รอปั่นแยกประเภท (0000)
                </Button>
                <hr />
              </Form>
            </Card>
          </Col>

          <Col xxl={20} lg={19} style={{ paddingLeft: 20 }}>
            <Row>
              {compo_status && (
                <Button onClick={Reset_all} type="primary" danger>
                  Refresh
                  {/* <AiOutlineReload style={{ fontSize: "25px", color: "#FFFF" }} /> */}
                </Button>
              )}
            </Row>
            {compo_status && (
              <Card className="card-stock_blooddetails-all">
                <Descriptions bordered column={compo_status?.length + 1}>
                  <Descriptions.Item label={<h1>ชนิด</h1>}></Descriptions.Item>
                  {compo_status?.map((item, index) => (
                    <Descriptions.Item
                      key={item.type_id}
                      //className={index % 2 === 0 ? "bg-gray" : ""}
                    >
                      <div
                        className="descriptions-click"
                        onClick={() => onClickRow(item)}
                      >
                        <h1>{item.type_name}</h1>
                      </div>
                    </Descriptions.Item>
                  ))}
                  <Descriptions.Item label={<h1>จำนวน</h1>}></Descriptions.Item>
                  {compo_status?.map((item, index) => (
                    <Descriptions.Item
                      key={item.type_id}
                      //className={index % 2 === 0 ? "bg-gray" : ""}
                    >
                      <div
                        className="descriptions-click"
                        onClick={() => onClickRow(item)}
                        // onClick={
                        //   isSearch === true
                        //     ? () =>
                        //         onClickSearch({
                        //           status_id: "9",
                        //           date_type: frmSearch.getFieldValue(
                        //             "date_type" || ""
                        //           ),
                        //           date_Search: frmSearch.getFieldValue("date_Search"),
                        //           unit_no: frmSearch.getFieldValue("unit_no" || ""),
                        //           antibody: frmSearch.getFieldValue("antibody" || ""),
                        //         })
                        //     : () => onClickRow(item)
                        // }
                      >
                        {item.type_num}
                      </div>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Card>
            )}
            <Row style={{ marginTop: 20 }}>
              {stock_status_detail && (
                <Card className="card-stock_blooddetails">
                  <Table
                    bordered
                    rowClassName={(record, index) => {
                      return index % 2 === 0 ? "bg-gray" : "";
                    }}
                    rowKey="id"
                    columns={columnComponent}
                    dataSource={stock_status_detail}
                    pagination={{
                      current: page,
                      total: Number(typeNum || 0),
                      onChange: onChangePagination,
                    }}
                  />
                </Card>
              )}
            </Row>
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
                  bordered
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
        onOk={handleOkEdit}
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
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
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
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
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
        visible={isModalVisibleComment}
        onOk={handleOkComment}
        onCancel={handleCancelComment}
      >
        <TextArea rows={4} />
      </Modal>
    </>
  );
};

export default stock_blooddetails;
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

import ReactDOM from "react-dom";
import { Layout2 } from "../components";
import { Steps, Button, message, Select, Form, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../lib/api";

const { Option } = Select;
const test = () => {
  const [newPname, setNewPname] = useState([]);
  const [newProvince, setProvince] = useState([]);
  const [newAmpure, setAmpure] = useState([]);
  const [newTumbon, setTumbon] = useState([]);
  const [newZip, setZip] = useState([]);

  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    const txt = result.data;
    setNewPname(txt);
    console.log("==onFinishEditUser==", txt);
    //
  };

  const Fetch_Province = async () => {
    const result = await api.get("/Get_Province");
    setProvince(result.data);
  };

  const Fetch_Aumpure = async (value) => {
    const result = await api.get("/Get_Aumpure", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setAmpure(result.data);

    console.log("อำเภอ", result.data);
  };

  const Fetch_Tumbon = async (value) => {
    const result = await api.get("/Get_Tumbon", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon(result.data);
    console.log("ตำบล", result.data);
  };

  const Fetch_Zip = async (value) => {
    const result = await api.get("/Get_Zip", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    setZip(result.data[0]);
    console.log("ไปรษณีย์",result.data);
  };

  // await Fetch_Aumpure();
  // await Fetch_Tumbon();
  // await Fetch_Zip();

  useEffect(async () => {
    await fetch_pname();
    await Fetch_Province();
  }, []);

  const Clickbtn = async (value) => {
    console.log("==onFinishEditUser==", value);
  };

  return (
    <>
      <Layout2>
        <Form.Item label="คำนำหน้า" name="pname_th">
          <Select>
            {newPname.map((item) => (
              <Option key={item.pname_th} value={item.pname_th}>
                {item.pname_th}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="คำนำหน้า" name="pname_en">
          <Select>
            {newPname.map((item) => (
              <Option key={item.pname_en} value={item.pname_en}>
                {item.pname_en}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="จังหวัด" name="PROVINCE_NAME">
          <Select onChange={Fetch_Aumpure}>
            {newProvince.map((item) => (
              <Option key={item.PROVINCE_ID} value={item.PROVINCE_ID}>
                {item.PROVINCE_NAME}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="อำเภอ" name="AUMPURE_NAME">
          <Select onChange={Fetch_Tumbon}>
            {newAmpure.map((item) => (
              <Option key={item.AMPHUR_ID} value={item.AMPHUR_ID}>
                {item.AMPHUR_NAME}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="ตำบล" name="PROVINCE_NAME">
          <Select onChange={Fetch_Zip}>
            {newTumbon.map((item) => (
              <Option key={item.DISTRICT_CODE} value={item.DISTRICT_CODE}>
                {item.DISTRICT_NAME}
              </Option>
            ))}
          </Select>
        </Form.Item>
                 <Input placeholder="ไปรษณีย์" value={newZip?.zipcode} disabled/>
              </Layout2>
    </>
  );
};

export default test;

const TestPrintComponent = ({ barcode }) => {
  return <div className="print">Test Test {barcode}</div>;
};

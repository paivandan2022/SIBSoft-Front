import { Table,Radio } from "antd";
import React,{ useEffect, useState } from "react";
import api from "../lib/api";

const columns = [
  {
    title: "แบบสอบถาม",
    dataIndex: "quest_Name",
    key: "quest_Name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "เลือก",
    dataIndex: "",
    key: "",
    render: (radio) => (
      <>
        <Radio.Group name="radiogroup" defaultValue={1}>
    <Radio value={0}>ใช่</Radio>
    <Radio value={1}>ไม่ใช่</Radio>
  </Radio.Group>
      </>
    ),
  },
];
function Donor_question() {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [newQuestion, setnewQuestion] = useState([]);
  const Fetch_question_list = async () => {
    const result = await api.get("/Get_question");
    console.log("คำถาม", result.data);
    setnewQuestion(result.data);
  };

  useEffect(async () => {
    await Fetch_question_list();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={newQuestion} />
    </div>
  );
}

export default Donor_question;

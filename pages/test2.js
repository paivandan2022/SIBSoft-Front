// export default test;

import { Button, DatePicker, Form, Input, Modal, Pagination } from "antd";
import moment from "moment";
import Router from "next/router";
import { useState } from "react";
const AdvancedSearchForm = () => {
  const [date, setDate] = useState();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  console.log("===", moment(date).format("YYYY MM DD"));

  const onChangeDate = (dateValue) => {
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");

    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const calAge = years + " ปี " + months + " เดือน " + day + " วัน";
    console.log("DateValues------------- ", calAge);

    setDate(calAge);

    form.setFieldsValue({
      date_string: calAge,
    });
  };

  const onChange = (page, pageSize) => {
    console.log("page", page);
    console.log("pageSize", pageSize);
  };
  // page    1    2         3
  // start   0    20        40
  // limit   20   20        20
  //       0-20   21-39     40-59
  //   offset = (page - 1) * itemsPerPage + 1

  // 1-1 *21
  // 2-1 * 21
  function success() {
    Modal.success({
      content: "some messages...some messages...",
      onOk: () => {
        Router.push("/home");
      },
    });
  }

  return (
    <>
      {" "}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Pagination onChange={onChange} total={500} pageSize={20} />
        <Form.Item name="date">
          <DatePicker onChange={onChangeDate} />
        </Form.Item>

        <Form.Item name="date_string">
          <Input disabled />
        </Form.Item>
        <Button type="primary" loading={true}>
          xxxxx
        </Button>
      </Form>
      <Button onClick={success}>Success</Button>
    </>
  );
};
export default AdvancedSearchForm;

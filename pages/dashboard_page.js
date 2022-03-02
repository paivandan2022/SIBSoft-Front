import { Button, Modal } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import user from "../lib/user";

const Page = () => {
  const [userData, setUserrData] = useState({});

  useEffect(() => {
    const userDataTemp = user.getUser();

    userDataTemp.name = `${userDataTemp.fname}  ${userDataTemp.lname}`;

    setUserrData(userDataTemp);
    console.log(userDataTemp);
  }, []);

  const json = {
    a: {
      b: {
        c: 5,
      },
    },
  };

  const onLogout = () => {
    Modal.confirm({
      title: "Are u ....",
      content: "test test",
      onOk: () => {
        Router.push("/");
      },
    });
  };

  return (
    <div>
      <Button onClick={onLogout}>Logout</Button>
      {userData.name}
      {json?.a?.b?.c}
      {userData?.user_type === "Admin" ? (
        <>
          <p>1111</p>
          <p>2222</p>
        </>
      ) : (
        ""
      )}

      {userData.user_type === "User" && (
        <>
          <p>1111</p>
          <p>2222</p>
        </>
      )}

      <p>333</p>
      <p>444</p>
      <p>555</p>
      <p>665</p>
    </div>
  );
};

export default Page;

import { useEffect, useState } from "react";
import user from "../../lib/user";

const Page = () => {
  const [userData, setUserrData] = useState({});

  useEffect(() => {
    const userDataTemp = user.getUser();

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

  return (
    <div>
      {json?.a?.b?.c}
      {userData?.user_type === "Admin" ? (
        <>
          <p>1111</p>
          <p>2222</p>
        </>
      ) : (
        ""
      )}

      {userData.user_type === "xxx" && (
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

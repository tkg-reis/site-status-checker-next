import React, { useEffect, useState } from "react";
import { userDataType } from "../types/types";

const Login = () => {
  const ENDPOINT = "/api/DBconnection";
  const [list, setList] = useState<userDataType[]>([]);
  const fetchData = async (): Promise<userDataType[] | void> => {
    try {
      const res: userDataType[] = await fetch(ENDPOINT).then((res) =>
        res.json()
      );
      setList(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {list != null
        ? list.map((li) => {
            return (
              // keyを設定するときは他のタグで囲われているのはNG
              // auth apiからアドレスと名前の取得
              <li key={li.id}>
                {li.mail_adress}
                {li.user_name}
              </li>
            );
          })
        : "ネットワーク未接続またはDB接続エラーです"}
    </div>
  );
};

export default Login;

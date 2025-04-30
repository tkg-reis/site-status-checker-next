'use client'
import React, { useEffect, useState } from "react";
import { userDataType } from "../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const User = () => {
  const ENDPOINT = "/api/user";
  const [user, setUser] = useState<userDataType[]>([]);
  const fetchUserData = async (): Promise<userDataType[] | void> => {
    try {
      const res: userDataType[] = await fetch(ENDPOINT).then((res) =>
        res.json()
      );
      setUser(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <>
       {user != null
          ? user.map((data) => {
              return (
                <div>
                  
                </div>
              );
            })
          : "ネットワーク未接続またはDB接続エラーです"}
    </>
  )
};

export default User;

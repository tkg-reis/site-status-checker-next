"use client";
import React, { useEffect, useState } from "react";
import { registerUrlType, userDataType } from "../types/types";
import SkeltonCard from "@/components/skeltonCard";
import MappingRegisteredUrl from "@/components/mappingRegisteredUrl";
// import { headers } from "next/headers";

const User = () => {
  // const requestUrl = headers().get('target-url');
  const [loading, setLoading] = useState(true);

  const ENDPOINT = {
    registerUrl: "/api/fetchRegisteredURLs",
    userData: "/api/user",
  };
  const [registeredUrlData, setregisteredUrlData] = useState<registerUrlType[]>(
    []
  );
  const [user, setUser] = useState<userDataType[]>([]);
  const fetchUrlData = async (): Promise<registerUrlType[] | void> => {
    try {
      const res: registerUrlType[] = await fetch(ENDPOINT.registerUrl, {
        cache: "no-store",
      }).then((res) => res.json());
      setregisteredUrlData((prev) => [...prev, ...res]);
    } catch (error) {
      throw new Error(`Failed to fetch data at user page : ${error}`);
    }
  };

  const fetchUserData = async (): Promise<userDataType[] | void> => {
    try {
      const res: userDataType[] = await fetch(ENDPOINT.userData, {
        cache: "force-cache",
      }).then((res) => res.json());
      setUser(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  };

  useEffect(() => {
    try {
      fetchUrlData();
      // fetchUserData();
    } catch (error) {
      throw new Error(`Failed to fetch data at api access : ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <SkeltonCard />;

  return (
    <>
      <div className="flex gap-3 flex-wrap">
        {/* {requestUrl} */}
        {registeredUrlData != null
          ? <MappingRegisteredUrl urlDatas={registeredUrlData} />
          : "ネットワーク未接続またはDB接続エラーです"}
      </div>
    </>
  );
};

export default User;

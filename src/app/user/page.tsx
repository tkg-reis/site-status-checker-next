"use client";
import React, { useEffect, useState } from "react";
import { registerUrlType } from "../types/types";
import SkeltonCard from "@/components/skeltonCard";
import MappingRegisteredUrl from "@/components/mappingRegisteredUrl";
import MappingUserData from "@/components/mappingUserData";
import type { User } from "@supabase/supabase-js";
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
  const [user, setUser] = useState<User>();
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

  const fetchUserData = async (): Promise<User | void> => {
    try {
      const res: User = await fetch(ENDPOINT.userData, {
        cache: "force-cache",
      }).then((res) => res.json());
      console.log(res);
      
      setUser(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  };

  useEffect(() => {
    try {
      fetchUrlData();
      fetchUserData();
    } catch (error) {
      throw new Error(`Failed to fetch data at api access : ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <SkeltonCard />;

  return (
    <>
      <h2 className="m-2 font-bold text-xl">user</h2>
      <div className="border">
        {user != null 
          ? <MappingUserData user={user}/> 
          : "ネットワーク未接続またはDB接続エラーです"}
      </div>
      <h2 className="m-2 font-bold text-xl">registered url info</h2>
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

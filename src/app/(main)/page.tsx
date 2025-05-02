"use client";
import { useEffect, useState } from "react";
import { registerUrlType, siteUrlType } from "../types/types";
import axios from "axios";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ENDPOINT = "/api/fetchSiteURLs";
  const [urlDatas, setUrlData] = useState<siteUrlType[]>([]);
  const fetchData = async (): Promise<siteUrlType[] | void> => {
    try {
      const res: siteUrlType[] = await fetch(ENDPOINT, {
        cache: "no-store",
      }).then((res) => res.json());
      const processedData = await processData(res);
      setUrlData((prev) => [...prev, ...processedData]);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data");
    }
  };
  const processData = async (dataArray : siteUrlType[]) :Promise<siteUrlType[]>=> {
      return await Promise.all(dataArray.map(async(data) => {
        data.status_number = (await axios.get(data.url)).status
        return {
          ...data,
          status_number: data.status_number,
        }
      }));
  };



  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return <p className="absolute bottom-1/2 left-1/2 text-3xl">Loading....</p>;

  // if(!isLoggedIn) 
  return (
    <>
      <div className="flex gap-x-8 gap-y-4 flex-wrap">
        {urlDatas != null
          ? urlDatas.map((urlData) => {
              return (
                <Link href={`/urlData/${urlData.id}`} key={urlData.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{urlData.company_name}</CardTitle>
                      <CardDescription>{urlData.status_number}</CardDescription>
                      <div
                        className={`${urlData.status_number === 200 ? "green-flashing" : "red-flashing"}`}
                      ></div>
                    </CardHeader>
                    <CardContent>{urlData.url}</CardContent>
                    <CardFooter>{urlData.create_at}</CardFooter>
                  </Card>
                </Link>
              );
            })
          : "ネットワーク未接続またはDB接続エラーです"}
      </div>
    </>
  );
}

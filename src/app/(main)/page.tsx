"use client";
import { useEffect, useState } from "react";
import { siteUrlType } from "../types/types";
import SkeltonCard from "@/components/skeltonCard";
import MappingSiteURL from "@/components/mappingSiteUrl";
// import { headers } from "next/headers";

export default function Home() {
  // const requestUrl = headers().get('target-url');
  const [loading, setLoading] = useState(true);

  const ENDPOINT = "/api/fetchSiteURLs";

  const [urlDatas, setUrlData] = useState<siteUrlType[]>([]);

  const fetchData = async (): Promise<siteUrlType[] | void> => {
    try {

      const res: siteUrlType[] = await fetch(ENDPOINT, {
        cache: "no-store",
      }).then((res) => res.json());
      
      setUrlData((prev) => [...prev, ...res]);

    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <SkeltonCard/>;

  return (
    <>
      <div className="flex gap-x-8 gap-y-4 flex-wrap">
        {/* {requestUrl} */}
        {urlDatas != null
          ? <MappingSiteURL urlDatas={urlDatas} />
          : "ネットワーク未接続またはDB接続エラーです"}
      </div>
    </>
  );
}

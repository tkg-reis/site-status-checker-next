'use client';
import { useEffect, useState } from "react";
import { monitorChecksRow } from "../../types/types";
import SkeltonCard from "@/components/skeltonCard";
import MappingSiteURL from "@/components/mappingSiteUrl";

export default function Top() {
  const [loading, setLoading] = useState(true);
  const [urlDatas, setUrlData] = useState<monitorChecksRow[]>([]);

  const ENDPOINT = {
    urlDataLog : "/api/fetchSiteURLs",
    logInsert : "/api/logInsert" 
  }

  const fetchUrlData = async (): Promise<monitorChecksRow[] | void> => {
    try {
      const res: monitorChecksRow[] = await fetch(ENDPOINT.urlDataLog, {
        cache: "no-store",
      }).then((res) => res.json());
      
      setUrlData(res);
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`);
    }
  };

  useEffect(() => {
    (async() => {
      try {
        await fetch(ENDPOINT.logInsert, { method: "POST" });
        await fetchUrlData();
      } catch (error) {
        throw new Error(`Failed to fetch data ${error}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <SkeltonCard/>;

  return (
    <>
      <div className="flex gap-x-8 gap-y-4 flex-wrap">
        {urlDatas != null
          ? <MappingSiteURL urlDatas={urlDatas} />
          : "ネットワーク未接続またはDB接続エラーです"}
      </div>
    </>
  );
}

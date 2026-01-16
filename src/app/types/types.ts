import { Database } from "../../../database.types";

export interface siteUrlType {
  id: number;
  created_at: number;
  url: string;
  company_name: string;
  status_number: number;
}

export type MonitorChecks = Database["public"]["Tables"]["monitor_checks"]["Row"];
export interface registerUrlType {
  id: number;
  created_at: number;
  url : string;
  company_name: string;
  execution_time : string;
}
export type monitors = Database["public"]["Tables"]["monitors"]["Row"];

export type monitorRow = {
  id: string;
  name: string;
  url: string;
  created_at: string;
  monitor_checks?: {
    checked_at: string;
    status_code: number | null;
    error_message: string | null;
  }[];
}

export interface MappingSiteURLProps  {
  urlDatas: monitorRow[]
}

export interface MappingRegisteredURLProps {
  urlDatas: monitors[]
}
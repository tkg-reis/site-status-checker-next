import { Database } from "../../../database.types";

export type MonitorChecks = Database["public"]["Tables"]["monitor_checks"]["Row"];

export type monitors = Database["public"]["Tables"]["monitors"]["Row"];

export type monitorChecksRow = {
  id: number
  checked_at: string
  status_code: number | null
  error_message: string | null
  monitor_id: string
  monitors?: {
    id: string;
    name: string;
    url : string;
  };
}

export interface MappingSiteURLProps  {
  urlDatas: monitorChecksRow[]
}

export interface MappingRegisteredURLProps {
  urlDatas: monitors[]
}
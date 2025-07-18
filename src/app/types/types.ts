export interface siteUrlType {
  id: number;
  created_at: number;
  url: string;
  company_name: string;
  status_number: number;
}
export interface registerUrlType {
  id: number;
  created_at: number;
  url : string;
  company_name: string;
  execution_time : string;
}

export interface MappingSiteURLProps  {
  urlDatas: siteUrlType[]
}

export interface MappingRegisteredURLProps {
  urlDatas: registerUrlType[]
}
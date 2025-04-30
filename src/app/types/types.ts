export interface userDataType {
  id: number;
  created_at: string;
  user_name: string;
  mail_adress: string;
  manager_admin: number;
  password: string;
}

export interface siteUrlType {
  id: number;
  create_at: number;
  url: string;
  company_name: string;
  status_number: number;
}
export interface registerUrlType {
  id: number;
  create_at: number;
  url : string;
  company_name: string;
}
export interface LogModal {
  id: number;
  name: string;
  operIp: string;
  operInter: string;
  operDesc: string;
  newCreateTime: string;
}

export interface LogTableItem extends LogModal {}

export interface LogTableParams {
  param: string;
}

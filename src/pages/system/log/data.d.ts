interface LogModal {
  id: number;
  name: string;
  operIp: string;
  operInter: string;
  operDesc: string;
  newCreateTime: string;
}

interface LogTableItem extends LogModal {}

interface LogTableParams {
  param: string;
}

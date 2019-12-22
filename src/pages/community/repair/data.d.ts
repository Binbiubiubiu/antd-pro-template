interface RepairModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface RepairTableItem extends RepairModal {}

interface RepairTableForm extends RepairModal {
  desc: string;
}

interface RepairTableParams {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

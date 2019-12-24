interface RepairModal {
  id: number;
  houseName: string;
  name: string;
  type: string;
  state: string;
  expactTime: string;
  createTime: string;
}

interface RepairTableItem extends RepairModal {}

interface RepairTableForm extends RepairModal {}

interface RepairTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

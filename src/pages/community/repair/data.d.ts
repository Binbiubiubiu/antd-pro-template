export interface RepairModal {
  id: number;
  houseName: string;
  name: string;
  type: string;
  state: string;
  expactTime: string;
  createTime: string;
}

export interface RepairTableItem extends RepairModal {}

export interface RepairTableForm extends RepairModal {}

export interface RepairTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

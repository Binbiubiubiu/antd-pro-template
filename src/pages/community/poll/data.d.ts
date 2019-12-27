export interface PollModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

export interface PollTableItem extends PollModal {}

export interface PollTableForm extends PollModal {
  desc: string;
}

export interface PollTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

export interface PollInfoTableItem {
  option: string;
  num: number;
  rate: number;
}

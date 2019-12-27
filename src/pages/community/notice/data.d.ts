export interface NoticeModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

export interface NoticeTableItem extends VisitorModal {}

export interface NoticeTableForm extends VisitorModal {
  desc: string;
}

export interface NoticeTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

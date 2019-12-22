interface NoticeModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface NoticeTableItem extends VisitorModal {}

interface NoticeTableForm extends VisitorModal {
  desc: string;
}

interface NoticeTableParams {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

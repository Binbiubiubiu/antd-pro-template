interface VisitorModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface VisitorTableItem extends VisitorModal {}

interface VisitorTableForm extends VisitorModal {
  desc: string;
}

interface VisitorTableParams {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

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

interface VisitorTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

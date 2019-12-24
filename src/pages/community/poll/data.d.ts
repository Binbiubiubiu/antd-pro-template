interface PollModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface PollTableItem extends PollModal {}

interface PollTableForm extends PollModal {
  desc: string;
}

interface PollTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

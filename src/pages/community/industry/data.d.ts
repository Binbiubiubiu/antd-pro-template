interface IndustryModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface IndustryTableItem extends IndustryModal {}

interface IndustryTableForm extends IndustryModal {
  desc: string;
}

interface IndustryTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

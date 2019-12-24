interface CarModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface CarTableItem extends CarModal {}

interface CarTableSearch {
  houseName: string;
  person: string;
}

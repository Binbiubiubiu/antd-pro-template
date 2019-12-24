interface HouseModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface HouseTableItem extends HouseModal {}

interface HouseTableSearch {
  houseName: string;
  person: string;
}

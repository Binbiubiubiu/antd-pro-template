export interface CarModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

export interface CarTableItem extends CarModal {}

export interface CarTableSearch {
  houseKey: string;
  carCode: string;
  ownerName: string;
}

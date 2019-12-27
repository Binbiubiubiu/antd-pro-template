export interface HouseModal {
  id: number;
  houseCode: string;
}

export interface HouseTableItem extends HouseModal {
  buildName: string;
  unitName: string;
  houseName: string;
  createTime: string;
}

export interface HouseTableSearch {
  houseKey: string;
  houseinfo: string;
}

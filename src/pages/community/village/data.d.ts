export interface VillageModal {
  id: number;
  houseKey: string;
  address: string;
  propertyPhone: string;
  fireName: string;
  firePhone: string;
}

export interface VillageTableItem extends VillageModal {
  houseName: string;
  createName: string;
  createTime: string;
}

export interface VillageTableSearch {
  houseKey: string;
  userinfo: string;
}

interface VillageModal {
  id: number;
  houseKey: string;
  address: string;
  propertyPhone: string;
  fireName: string;
  firePhone: string;
}

interface VillageTableItem extends VillageModal {
  houseName: string;
  createName: string;
  createTime: string;
}

interface VillageTableSearch {
  houseKey: string;
  userinfo: string;
}

interface VillageModal {
  id: number;
  houseName: string;
  housePhone: string;
  address: string;
  phone: string;
  manager: string;
  creator: string;
  createTime: string;
}

interface VillageTableItem extends VillageModal {}

interface VillageTableSearch {
  houseName: string;
  person: string;
}

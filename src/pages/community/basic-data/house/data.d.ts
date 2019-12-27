interface HouseModal {
  id: number;
  houseCode: string;
}

interface HouseTableItem extends HouseModal {
  buildName: string;
  unitName: string;
  houseName: string;
  createTime: string;
}

interface HouseTableSearch {
  houseKey: string;
  houseinfo: string;
}

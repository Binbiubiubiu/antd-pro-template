export interface HouseModal {
  id: number;
  houseKey: string;
  builddingId: string;
  unitId: string;
  roomId: string;
  roomNumber: string;
}

export interface HouseTableItem extends HouseModal {
  buildName: string;
  unitName: string;
  houseName: string;
  buildName: string;
  roomName: string;
  createTime: string;
}

export interface HouseTableSearch {
  houseKey: string;
  name: string;
}

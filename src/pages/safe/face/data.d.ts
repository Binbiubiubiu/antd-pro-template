export interface PeopleFaceModal {
  id: number;
  houseKey: string;
  devicePosition: string;
  pic: string;
  happenTime: string;
  remarkDeviceName: string;
}

export interface PeopleFaceListItem extends PeopleFaceModal {
  houseName: string;
}

export interface PeopleFaceListSearch {
  houseKey: string;
  place: string;
  start: string;
  end: string;
}

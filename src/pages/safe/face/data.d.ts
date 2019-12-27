export interface PeopleFaceModal {
  carCode: string;
  pic: string;
  houseName: string;
  ownerName: string;
  doorName: string;
  inOut: number;
  happenTime: string;
  deviceName: string;
  remarkDeviceName: string;
}

export interface PeopleFaceListItem extends PeopleFaceModal {}

export interface PeopleFaceListSearch {
  houseName: string;
  person: string;
}

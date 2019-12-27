export interface CarAccessModal {
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

export interface CarAccessListItem extends CarAccessModal {}

export interface CarAccessListSearch {
  houseName: string;
  person: string;
}

export interface PersonAccessModal {
  name: string;
  pic: string;
  houseName: string;
  identity: string;
  doorName: string;
  inOut: number;
  happenTime: string;
  deviceName: string;
  remarkDeviceName: string;
}

export interface PersonAccessListItem extends PersonAccessModal {}

export interface PersonAccessListSearch {
  houseName: string;
  person: string;
}

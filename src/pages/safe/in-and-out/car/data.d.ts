interface CarAccessModal {
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

interface CarAccessListItem extends CarAccessModal {}

interface CarAccessListSearch {
  houseName: string;
  person: string;
}

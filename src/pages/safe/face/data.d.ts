interface PeopleFaceModal {
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

interface PeopleFaceListItem extends PeopleFaceModal {}

interface PeopleFaceListSearch {
  houseName: string;
  person: string;
}

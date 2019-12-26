interface PersonAccessModal {
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

interface PersonAccessListItem extends PersonAccessModal {}

interface PersonAccessListParams {
  houseName: string;
  person: string;
}

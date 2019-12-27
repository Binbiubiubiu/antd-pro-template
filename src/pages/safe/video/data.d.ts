export interface VideoModal {
  id: number;
  houseKey: string;
  houseName: string;
  indexCodeId: string;
  deviceCode: string;
  deviceName: string;
  code: string;
  isOnline: number; // 0:在线  1:离线
  deviceTime: string;
  createTime: string;
  dateString: string;
  codeChildName: string;
}

export interface VideoCardListItem extends VideoModal {}

export interface VideoCardListParams {
  houseKey: string;
  start: string;
  end: string;
  deviceName: string;
  codeChild: number;
}

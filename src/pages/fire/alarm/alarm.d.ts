export interface AlarmModal {
  id: number;
  houseName: string;
  confirmStatus: string;
  deviceTypeName: string;
  deviceName: string;
  position: string;
  productTime: string;
  confirmTime: string;
}

export interface AlarmTableItem extends AlarmModal {}

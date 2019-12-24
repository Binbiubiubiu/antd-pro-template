interface AlarmModal {
  id: number;
  houseName: string;
  confirmStatus: string;
  deviceTypeName: string;
  deviceName: string;
  position: string;
  productTime: string;
  confirmTime: string;
}

interface AlarmTableItem extends AlarmModal {}

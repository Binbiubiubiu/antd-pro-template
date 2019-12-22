interface AlarmModal {
  id: number;
  houseName: string;
  state: string;
  type: string;
  equipName: string;
  address: string;
  alarmTime: string;
  confirmTime: string;
}

interface ALarmTableItem extends AlarmModal {}

interface AlarmTableParams extends Pageable<{}> {}

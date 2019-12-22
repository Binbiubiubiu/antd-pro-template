interface VillageModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface VillageTableItem extends VillageModal {}

interface VillageTableForm extends VillageModal {
  desc: string;
}

interface VillageTableParams {
  houseName: string;
  person: string;
}

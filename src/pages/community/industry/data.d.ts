interface IndustryModal {
  id: number;
  houseId: string;
  name: string;
  sex: number;
  IDCard: string;
  phone: string;
  job: string;
  pollNum: string;
}

interface IndustryTableItem extends IndustryModal {
  houseName: string;
  createTime: string;
}

type IndustryTableForm = Partial<IndustryModal>;

type IndustryTableSearch = Partial<{
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}>;

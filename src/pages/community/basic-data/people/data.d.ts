interface PeopleModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface PeopleTableItem extends PeopleModal {}

interface PeopleTableSearch {
  houseName: string;
  person: string;
}

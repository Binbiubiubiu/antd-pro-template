interface VisitorModal {
  id: number;
  houseKey: string;
  userName: string;
  idcard: string;
  phone: string;
  interviewee: string;
  address: string;
  visitNote: string;
}

interface VisitorTableItem extends VisitorModal {
  createTimeString: string;
}

interface VisitorTableSearch {
  houseName: string;
  userinfo: string;
}

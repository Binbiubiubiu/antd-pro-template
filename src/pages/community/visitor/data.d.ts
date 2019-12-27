export interface VisitorModal {
  id: number;
  houseKey: string;
  userName: string;
  idcard: string;
  phone: string;
  interviewee: string;
  address: string;
  visitNote: string;
}

export interface VisitorTableItem extends VisitorModal {
  createTimeString: string;
}

export interface VisitorTableSearch {
  houseName: string;
  userinfo: string;
}

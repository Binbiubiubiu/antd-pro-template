export interface PatrolPerson {
  id: number;
  name: string;
  phone: string;
  sex: string;
  houseName: string;
}

export interface PatrolPoint {
  id: number;
  name: string;
  cardNo: string;
  equipId: string;
  address: string;
}

export interface PatrolTask {
  id: number;
  houseName: string;
  TaskName: string;
  line: string;
  patrolPeople: string;
  mode: string;
}

export interface PatrolError {
  id: number;
  houseName: string;
  TaskName: string;
  line: string;
  patrolPeople: string;
  happenTime: string;
}

export interface PatrolEvent {
  id: number;
  name: string;
  eventName: string;
  address: string;
  createTime: string;
}

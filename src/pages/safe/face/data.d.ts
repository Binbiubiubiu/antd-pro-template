export interface PeopleFaceModal {
  id: number;
  houseKey: string;
  place: string;
  photo: string;
  faceTime: string;
}

export interface PeopleFaceListItem extends PeopleFaceModal {
  houseName: string;
}

export interface PeopleFaceListSearch {
  houseKey: string;
  place: string;
  start: string;
  end: string;
}

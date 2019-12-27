export interface SuggestModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

export interface SuggestTableItem extends SuggestionModal {}

export interface SuggestTableForm extends SuggestionModal {
  desc: string;
}

export interface SuggestTableSearch {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

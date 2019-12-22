interface SuggestModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface SuggestTableItem extends SuggestionModal {}

interface SuggestTableForm extends SuggestionModal {
  desc: string;
}

interface SuggestTableParams {
  houseName: string;
  type: string;
  createTime: string;
  content: string;
}

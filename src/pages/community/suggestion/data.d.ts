interface SuggestionModal {
  id: number;
  houseName: string;
  content: string;
  type: string;
  state: string;
  createMan: string;
  createTime: string;
}

interface SuggestionTableItem extends SuggestionModal {}

interface SuggestionTableForm extends SuggestionModal {}

interface SuggestionTableParams {
  houseName?: string;
  type?: string;
  createTime?: string;
  content?: string;
}

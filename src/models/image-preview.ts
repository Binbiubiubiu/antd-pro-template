import { AnyAction, Reducer } from 'redux';
import { Dispatch } from 'dva';

export interface ImagePreviewModelState {
  url: string;
}

export interface ImagePreviewModalType {
  namespace: 'imagePreview';
  state: ImagePreviewModelState;
  effects: {};
  reducers: {
    open: Reducer<ImagePreviewModelState>;
    hide: Reducer<ImagePreviewModelState>;
  };
  subscriptions: {};
}

const ImagePreviewModel: ImagePreviewModalType = {
  namespace: 'imagePreview',

  state: {
    url: '',
  },

  effects: {},

  reducers: {
    open(state: ImagePreviewModelState = { url: '' }, { payload }: any): ImagePreviewModelState {
      return {
        ...state,
        url: payload.url,
      };
    },
    hide(state: ImagePreviewModelState = { url: '' }, { payload }: any): ImagePreviewModelState {
      return {
        ...state,
        url: '',
      };
    },
  },

  subscriptions: {},
};

export const openImagePreview = (dispatch: Dispatch<AnyAction>, url: string) => {
  dispatch({ type: 'imagePreview/open', payload: { url } });
};
export const hideImagePreview = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'imagePreview/hide' });
};

export default ImagePreviewModel;

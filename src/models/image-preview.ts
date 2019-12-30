import { AnyAction, Reducer } from 'redux';
import { Dispatch } from 'dva';

export interface ImagePreviewModelState {
  url: string;
  isLocal: boolean;
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
    isLocal: false, // 是否是本地图片
  },

  effects: {},

  reducers: {
    open(
      state: ImagePreviewModelState = { url: '', isLocal: true },
      { payload }: any,
    ): ImagePreviewModelState {
      return {
        ...state,
        url: payload.url,
        isLocal: !!payload.isLocal,
      };
    },
    hide(state: ImagePreviewModelState = { url: '', isLocal: true }): ImagePreviewModelState {
      return {
        ...state,
        url: '',
        isLocal: false,
      };
    },
  },

  subscriptions: {},
};

export const openImagePreview = (dispatch: Dispatch<AnyAction>, url: string) => {
  dispatch({ type: 'imagePreview/open', payload: { url } });
};

export const openLocaleImagePreview = (dispatch: Dispatch<AnyAction>, url: string) => {
  dispatch({ type: 'imagePreview/open', payload: { url, isLocal: true } });
};
export const hideImagePreview = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'imagePreview/hide' });
};

export default ImagePreviewModel;

import produce from 'immer';

const Types = {
  HANDLE_SIGN_IN_REQUEST: '@authContext/HANDLE_SIGN_IN_REQUEST',
  HANDLE_SIGN_IN_SUCCESS: '@authContext/HANDLE_SIGN_IN_SUCCESS',
  HANDLE_SIGN_IN_FAILURE: '@authContext/HANDLE_SIGN_IN_FAILURE',
  HANDLE_LOG_OUT_REQUEST: '@authContext/HANDLE_LOG_OUT_REQUEST',
  HANDLE_LOG_OUT_SUCCESS: '@authContext/HANDLE_LOG_OUT_SUCCESS',
  HANDLE_LOG_OUT_FAILURE: '@authContext/HANDLE_LOG_OUT_FAILURE',
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.HANDLE_SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;

        action.payload.setAuth({
          signed: true,
          token: action.payload.token,
        });
        break;
      }
      case Types.HANDLE_SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HANDLE_LOG_OUT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_LOG_OUT_SUCCESS: {
        draft.token = null;
        draft.signed = false;
        draft.loading = false;

        action.payload.setAuth({});
        break;
      }
      case Types.HANDLE_LOG_OUT_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

export { reducer, INITIAL_STATE, Types };

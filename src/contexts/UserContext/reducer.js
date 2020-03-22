import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  user: null,
};

const Types = {
  HANDLE_SIGN_IN_SUCCESS: '@userContext/HANDLE_SIGN_IN_SUCCESS',
  HANDLE_SIGN_UP_REQUEST: '@userContext/HANDLE_SIGN_UP_REQUEST',
  HANDLE_SIGN_UP_SUCCESS: '@userContext/HANDLE_SIGN_UP_SUCCESS',
  HANDLE_SIGN_UP_FAILURE: '@userContext/HANDLE_SIGN_UP_FAILURE',
  HANDLE_UPDATE_REQUEST: '@userContext/HANDLE_UPDATE_REQUEST',
  HANDLE_UPDATE_SUCCESS: '@userContext/HANDLE_UPDATE_SUCCESS',
  HANDLE_UPDATE_FAILURE: '@userContext/HANDLE_UPDATE_FAILURE',
};

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.HANDLE_SIGN_IN_SUCCESS: {
        action.payload.context.setAuth({
          user: action.payload.user,
        });
        break;
      }
      case Types.HANDLE_SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_SIGN_UP_SUCCESS: {
        draft.loading = false;

        break;
      }
      case Types.HANDLE_SIGN_UP_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HANDLE_UPDATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_UPDATE_SUCCESS: {
        draft.loading = false;

        action.payload.authContext.setAuth({
          ...action.payload.authContext.getState('@gobarber/userContext'),
          user: action.payload.user,
        });
        break;
      }
      case Types.HANDLE_UPDATE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

export { Types, reducer, INITIAL_STATE };

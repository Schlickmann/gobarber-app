import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { signUp, updateUser } from './actions';
import { reducer, INITIAL_STATE, Types } from './reducer';
import usePersistedState from '~/utils/UsePersistedState';

const userContext = createContext(INITIAL_STATE);
const { Provider } = userContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [authUser, setAuthUser, getState] = usePersistedState(
    '@gobarber/userContext',
    {}
  );
  const context = useMemo(() => {
    return { authUser, setAuthUser, getState };
  }, [authUser, setAuthUser, getState]);

  const {
    authUser: { user },
  } = context;
  const value = {
    ...state,
    user: user || state.user,
    signUpRequest: (name, email, password) => {
      dispatch({ type: Types.HANDLE_SIGN_UP_REQUEST });
      signUp(name, email, password, dispatch);
    },
    updateUserRequest: data => {
      dispatch({ type: Types.HANDLE_UPDATE_REQUEST });
      updateUser(data, dispatch);
    },
    updateAuthUser: async userInfo => {
      await setAuthUser({ user: userInfo });
      dispatch({
        type: Types.HANDLE_SIGN_IN_SUCCESS,
        payload: { user: userInfo },
      });
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { userContext, UserProvider };

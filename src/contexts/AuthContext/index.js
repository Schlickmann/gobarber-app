import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import { signIn, logOut } from './actions';
import { reducer, INITIAL_STATE, Types } from './reducer';

import { getData } from '~/utils/storage';
import setHeader from '~/utils/functions/setHeader';
import { userContext } from '~/contexts/UserContext';

const authContext = createContext(INITIAL_STATE);
const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const dbData = getData('@gobarber/authContext');
  if (dbData.signed) {
    setHeader('Authorization', `Bearer ${dbData.token}`);
  }

  const { updateAuthUser } = useContext(userContext);

  const { token, signed, loading } = dbData;

  const value = {
    token: token || state.token,
    signed: signed || state.signed,
    loading: loading || state.loading,
    signInRequest: (email, password) => {
      dispatch({
        type: Types.HANDLE_SIGN_IN_REQUEST,
      });

      signIn(email, password, updateAuthUser, dispatch);
    },
    logOutRequest: () => {
      dispatch({
        type: Types.HANDLE_LOG_OUT_REQUEST,
      });

      logOut(updateAuthUser, dispatch);
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { authContext, AuthProvider };

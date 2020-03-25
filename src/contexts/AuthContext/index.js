import React, { createContext, useReducer, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { signIn, logOut } from './actions';
import { reducer, INITIAL_STATE, Types } from './reducer';

// import { getData } from '~/utils/storage';
import usePersistedState from '~/utils/UsePersistedState';
import setHeader from '~/utils/functions/setHeader';
import { userContext } from '~/contexts/UserContext';

const authContext = createContext(INITIAL_STATE);
const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [auth, setAuth, getState] = usePersistedState(
    '@gobarber/authContext',
    {}
  );
  const context = useMemo(() => {
    if (auth.signed) {
      setHeader('Authorization', `Bearer ${auth.token}`);
    }
    return { auth, setAuth, getState };
  }, [auth, setAuth, getState]);

  const { updateAuthUser } = useContext(userContext);

  const {
    auth: { token, signed, loading },
  } = context;

  const value = {
    token: token || state.token,
    signed: signed || state.signed,
    loading: loading || state.loading,
    signInRequest: (email, password) => {
      dispatch({
        type: Types.HANDLE_SIGN_IN_REQUEST,
      });

      signIn(email, password, updateAuthUser, dispatch, context);
    },
    logOutRequest: () => {
      dispatch({
        type: Types.HANDLE_LOG_OUT_REQUEST,
      });

      logOut(updateAuthUser, dispatch, context);
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { authContext, AuthProvider };

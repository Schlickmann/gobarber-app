import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { signUp, updateUser } from './actions';
import { reducer, INITIAL_STATE, Types } from './reducer';
import { getData, setData } from '~/utils/storage';

const userContext = createContext(INITIAL_STATE);
const { Provider } = userContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const dbData = getData('@gobarber/authContext');

  const { user } = dbData;
  const value = {
    ...state,
    user: user || state.user,
    storeUserRequest: (name, email, password) => {
      dispatch({ type: Types.HANDLE_SIGN_UP_REQUEST });
      signUp(name, email, password, dispatch);
    },
    updateUserRequest: data => {
      dispatch({ type: Types.HANDLE_UPDATE_REQUEST });
      updateUser(data, dispatch);
    },
    updateAuthUser: async authUser => {
      await setData('@gobarber/authContext', { user: authUser });
      dispatch({
        type: Types.HANDLE_SIGN_IN_SUCCESS,
        payload: { user: authUser },
      });
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { userContext, UserProvider };

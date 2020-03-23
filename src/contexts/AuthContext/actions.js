import { Alert } from 'react-native';

import { setData } from '~/utils/UsePersistedState';
import setHeader from '~/utils/functions/setHeader';
import api from '~/services/api';
import { Types } from './reducer';

const signIn = async (email, password, updateAuthUser, dispatch) => {
  try {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Sign In Failure',
        'User is not a customer, please use the GoBarber web app.'
      );
      dispatch({
        type: Types.HANDLE_SIGN_IN_FAILURE,
      });
      return;
    }

    await setData('@gobarber/authContext', {
      token,
      signed: true,
    });

    setHeader('Authorization', `Bearer ${token}`);

    dispatch({
      type: Types.HANDLE_SIGN_IN_SUCCESS,
      payload: { token },
    });

    await updateAuthUser(user);

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert('Authentication Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_SIGN_IN_FAILURE,
    });
  }
};

const logOut = async (updateAuthUser, dispatch) => {
  try {
    await setData('@gobarber/authContext', {});

    dispatch({
      type: Types.HANDLE_LOG_OUT_SUCCESS,
    });

    await updateAuthUser(null);

    // history.push('/');
  } catch (error) {
    Alert.alert('Log out Failure', 'Something went wrong :(');
    dispatch({
      type: Types.HANDLE_LOG_OUT_FAILURE,
    });
  }
};

export { signIn, logOut };

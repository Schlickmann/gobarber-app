import { Alert } from 'react-native';
import api from '~/services/api';
import { Types } from './reducer';

const signIn = async (email, password, setAuth, updateAuthUser, dispatch) => {
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
    }
    dispatch({
      type: Types.HANDLE_SIGN_IN_SUCCESS,
      payload: { token, setAuth },
    });

    updateAuthUser(user);

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert('Authentication Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_SIGN_IN_FAILURE,
    });
  }
};

const logOut = (setAuth, updateAuthUser, dispatch) => {
  try {
    dispatch({
      type: Types.HANDLE_LOG_OUT_SUCCESS,
      payload: { setAuth },
    });

    updateAuthUser(null);

    // history.push('/');
  } catch (error) {
    Alert.alert('Log out Failure', 'Something went wrong :(');
    dispatch({
      type: Types.HANDLE_LOG_OUT_FAILURE,
    });
  }
};

export { signIn, logOut };

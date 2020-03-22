// import { toast } from 'react-toastify';

import api from '~/services/api';
import { Types } from './reducer';

const signIn = async (email, password, setAuth, updateAuthUser, dispatch) => {
  try {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      // toast.info('User is not a provider, please use the GoBarber mobile app.');
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
    // toast.error(error.response.data.error);
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
    // toast.error('Something went wrong :(');
    dispatch({
      type: Types.HANDLE_LOG_OUT_FAILURE,
    });
  }
};

export { signIn, logOut };

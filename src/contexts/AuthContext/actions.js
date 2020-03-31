import Alert from '~/components/Alert';
import api from '~/services/api';
import { Types } from './reducer';

const signIn = async (email, password, updateAuthUser, dispatch, context) => {
  try {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      await Alert(
        'Sign In Failure',
        'User is not a customer, please use the GoBarber web app.'
      );
      dispatch({
        type: Types.HANDLE_SIGN_IN_FAILURE,
      });
      return;
    }

    await context.setAuth({ token, signed: true });

    dispatch({
      type: Types.HANDLE_SIGN_IN_SUCCESS,
      payload: { token },
    });

    await updateAuthUser(user);
  } catch (error) {
    await Alert('Authentication Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_SIGN_IN_FAILURE,
    });
  }
};

const logOut = async (updateAuthUser, dispatch, context) => {
  try {
    await context.setAuth({ token: null, signed: false });

    dispatch({
      type: Types.HANDLE_LOG_OUT_SUCCESS,
    });

    await updateAuthUser(null);
  } catch (error) {
    await Alert('Log out Failure', 'Something went wrong :(');
    dispatch({
      type: Types.HANDLE_LOG_OUT_FAILURE,
    });
  }
};

export { signIn, logOut };

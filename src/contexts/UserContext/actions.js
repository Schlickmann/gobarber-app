import { navigate } from '~/navigation/RootNavigation';
import Alert from '~/components/Alert';
import api from '~/services/api';
import { Types } from './reducer';

const signUp = async (name, email, password, dispatch) => {
  try {
    const response = await api.post('/users', {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      await Alert('Sign Up', 'User added successfully');

      dispatch({
        type: Types.HANDLE_SIGN_UP_SUCCESS,
      });

      navigate('SignIn');
    }
  } catch (error) {
    await Alert('Sign Up Failure', error.response.data.error);

    dispatch({
      type: Types.HANDLE_SIGN_UP_FAILURE,
    });
  }
};

const updateUser = async (data, setAuthUser, dispatch) => {
  try {
    const { name, email, ...rest } = data;

    const user = {
      name,
      email,
      ...(rest.oldPassword.trim() ? rest : {}),
    };

    const response = await api.put('/users', user);
    await Alert('Success', 'Profile updated successfully');

    await setAuthUser({ user: response.data });

    dispatch({
      type: Types.HANDLE_UPDATE_SUCCESS,
      payload: { user: response.data },
    });
  } catch (error) {
    await Alert('Update Failure', error.response.data.error);
    dispatch({ type: Types.HANDLE_UPDATE_FAILURE });
  }
};

export { signUp, updateUser };

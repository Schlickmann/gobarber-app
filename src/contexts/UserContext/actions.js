import { Alert } from 'react-native';

import api from '~/services/api';
import { Types } from './reducer';

const signUp = async (name, email, password, dispatch) => {
  try {
    const response = await api.post('/users', {
      name,
      email,
      password,
      provider: true,
    });

    if (response.status === 200) {
      Alert.alert('Sign Up', 'User added successfully');

      dispatch({
        type: Types.HANDLE_SIGN_UP_SUCCESS,
      });

      // history.push('/');
    }
  } catch (error) {
    Alert.alert('Sign Up Failure', error.response.data.error);

    dispatch({
      type: Types.HANDLE_SIGN_UP_FAILURE,
    });
  }
};

const updateUser = async (data, authContext, dispatch) => {
  try {
    const { name, email, ...rest } = data;

    const user = {
      name,
      email,
      ...(rest.oldPassword.trim() ? rest : {}),
    };

    const response = await api.put('/users', user);
    Alert.alert('Success', 'Profile updated successfully');
    dispatch({
      type: Types.HANDLE_UPDATE_SUCCESS,
      payload: { user: response.data, authContext },
    });
  } catch (error) {
    Alert.alert('Update Failure', error.response.data.error);
    dispatch({ type: Types.HANDLE_UPDATE_FAILURE });
  }
};

export { signUp, updateUser };

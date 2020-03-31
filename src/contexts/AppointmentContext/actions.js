import { Alert } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';

import api from '~/services/api';
import { Types } from './reducer';

const getAppointments = async (data, dispatch) => {
  try {
    const response = await api.get(`/appointments`);

    const appointments = response.data.map(appointment => ({
      ...appointment,
      date_parsed: formatRelative(parseISO(appointment.date), new Date(), {
        addSuffix: true,
      }),
    }));

    dispatch({
      type: Types.HANDLE_APPOINTMENT_SUCCESS,
      payload: { appointments },
    });
  } catch (error) {
    Alert.alert('Dashboard Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_APPOINTMENT_FAILURE,
    });
  }
};

const cancelAppointment = async (id, dispatch) => {
  try {
    await api.delete(`/appointments/${id}`);

    Alert.alert('Cancellation Success', 'Appointment cancelled successfully');
    dispatch({ type: Types.HANDLE_CANCELLATION_SUCCESS, payload: { id } });
  } catch (error) {
    Alert.alert('Cancellation Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_CANCELLATION_FAILURE,
    });
  }
};

export { getAppointments, cancelAppointment };

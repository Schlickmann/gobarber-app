import { parseISO, formatRelative } from 'date-fns';

import Alert from '~/components/Alert';
import { navigate } from '~/navigation/RootNavigation';
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
    Alert('Dashboard Failure', error.response.data.error);
    dispatch({
      type: Types.HANDLE_APPOINTMENT_FAILURE,
    });
  }
};

const cancelAppointment = async (id, dispatch) => {
  try {
    await api.delete(`/appointments/${id}`);

    dispatch({ type: Types.HANDLE_CANCELLATION_SUCCESS, payload: { id } });

    Alert('Cancellation Success', 'Appointment cancelled successfully');
  } catch (error) {
    dispatch({
      type: Types.HANDLE_CANCELLATION_FAILURE,
    });
    Alert('Cancellation Failure', error.response.data.error);
  }
};

const storeAppointment = async (data, dispatch) => {
  try {
    const response = await api.post('/appointments', {
      provider_id: data.id,
      date: data.time,
    });

    dispatch({
      type: Types.HANDLE_STORE_SUCCESS,
      payload: {
        appointment: {
          ...response.data,
          date_parsed: formatRelative(
            parseISO(response.data.date),
            new Date(),
            {
              addSuffix: true,
            }
          ),
        },
      },
    });

    await Alert('Appointment Success', 'Appointment booked successfully');

    navigate('Dashboard');
  } catch (error) {
    dispatch({
      type: Types.HANDLE_STORE_FAILURE,
    });

    await Alert(
      'Appointment Failure',
      'Something went wrong, please try again later'
    );
  }
};

export { getAppointments, cancelAppointment, storeAppointment };

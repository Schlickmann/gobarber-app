import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  getAppointments,
  cancelAppointment,
  storeAppointment,
} from './actions';
import { reducer, INITIAL_STATE, Types } from './reducer';

const appointmentContext = createContext(INITIAL_STATE);
const { Provider } = appointmentContext;

const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = {
    ...state,
    appointmentsRequest: data => {
      dispatch({
        type: Types.HANDLE_APPOINTMENT_REQUEST,
      });

      getAppointments(data, dispatch);
    },
    cancelAppointmentRequest: id => {
      dispatch({
        type: Types.HANDLE_CANCELLATION_REQUEST,
      });

      cancelAppointment(id, dispatch);
    },
    storeAppointmentRequest: data => {
      dispatch({
        type: Types.HANDLE_STORE_REQUEST,
      });

      storeAppointment(data, dispatch);
    },
  };

  return <Provider value={value}>{children}</Provider>;
};

AppointmentProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export { appointmentContext, AppointmentProvider };

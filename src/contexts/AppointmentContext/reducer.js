import produce from 'immer';

const Types = {
  HANDLE_APPOINTMENT_REQUEST: '@appointmentContext/HANDLE_APPOINTMENT_REQUEST',
  HANDLE_APPOINTMENT_SUCCESS: '@appointmentContext/HANDLE_APPOINTMENT_SUCCESS',
  HANDLE_APPOINTMENT_FAILURE: '@appointmentContext/HANDLE_APPOINTMENT_FAILURE',
  HANDLE_STORE_REQUEST: '@appointmentContext/HANDLE_STORE_REQUEST',
  HANDLE_STORE_SUCCESS: '@appointmentContext/HANDLE_STORE_SUCCESS',
  HANDLE_STORE_FAILURE: '@appointmentContext/HANDLE_STORE_FAILURE',
  HANDLE_CANCELLATION_REQUEST:
    '@appointmentContext/HANDLE_CANCELLATION_REQUEST',
  HANDLE_CANCELLATION_SUCCESS:
    '@appointmentContext/HANDLE_CANCELLATION_SUCCESS',
  HANDLE_CANCELLATION_FAILURE:
    '@appointmentContext/HANDLE_CANCELLATION_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  appointments: [],
  timesheet: [],
};

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.HANDLE_APPOINTMENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_APPOINTMENT_SUCCESS: {
        draft.loading = false;
        draft.appointments = action.payload.appointments;
        break;
      }
      case Types.HANDLE_APPOINTMENT_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HANDLE_STORE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_STORE_SUCCESS: {
        draft.loading = false;
        draft.appointments = [
          ...state.appointments,
          action.payload.appointment,
        ];
        break;
      }
      case Types.HANDLE_STORE_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.HANDLE_CANCELLATION_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.HANDLE_CANCELLATION_SUCCESS: {
        draft.loading = false;
        draft.appointments = state.appointments.filter(
          a => a.id !== action.payload.id
        );
        break;
      }
      case Types.HANDLE_CANCELLATION_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

export { reducer, INITIAL_STATE, Types };

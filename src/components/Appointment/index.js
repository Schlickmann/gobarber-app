import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { appointmentContext } from '~/contexts/AppointmentContext';

import Colors from '~/styles/colors';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

function Appointment({ data }) {
  // Appointment Context
  const { cancelAppointmentRequest } = useContext(appointmentContext);

  return (
    <Container past={data.past} cancelable={data.cancelable}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />

        <Info>
          <Name past={data.past} cancelable={data.cancelable}>
            {data.provider.name}
          </Name>
          <Time past={data.past} cancelable={data.cancelable}>
            {data.date_parsed}
          </Time>
        </Info>
      </Left>
      {data.cancelable && (
        <TouchableOpacity onPress={() => cancelAppointmentRequest(data.id)}>
          <Icon name="event-busy" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    past: PropTypes.bool,
    cancelable: PropTypes.bool,
    date_parsed: PropTypes.string,
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Appointment;

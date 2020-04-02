import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';

import { appointmentContext } from '~/contexts/AppointmentContext';
import Background from '~/components/Background';
import Colors from '~/styles/colors';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirmation({ route }) {
  const { loading, storeAppointmentRequest } = useContext(appointmentContext);
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date()),
    [time]
  );

  function handleSubmit() {
    storeAppointmentRequest({ id: provider.id, time });
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton
          color={Colors.secondary}
          loading={loading}
          onPress={handleSubmit}
        >
          Book Now
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirmation.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      provider: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        avatar: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      time: PropTypes.string,
    }),
  }).isRequired,
};

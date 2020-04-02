import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';

import api from '~/services/api';
import Alert from '~/components/Alert';
import Background from '~/components/Background';
import Colors from '~/styles/colors';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirmation({ route, navigation }) {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date()),
    [time]
  );

  async function handleSubmit() {
    try {
      await api.post('/appointments', { provider_id: provider.id, date: time });

      await Alert('Appointment Success', 'Appointment booked successfully');

      navigation.navigate('Dashboard');
    } catch (error) {
      await Alert(
        'Appointment Failure',
        'Something went wrong, please try again later'
      );
    }
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
          // loading={loading}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

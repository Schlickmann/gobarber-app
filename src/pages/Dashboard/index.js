/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { appointmentContext } from '~/contexts/AppointmentContext';
import { userContext } from '~/contexts/UserContext';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const { user } = useContext(userContext);
  const { appointments, appointmentsRequest } = useContext(appointmentContext);

  useEffect(() => {
    function loadDashboard() {
      appointmentsRequest({ userId: user.id });
    }
    if (user) {
      loadDashboard();
    }
  }, [user]);

  return (
    <Background>
      <Container>
        <Title>Dashboard</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Appointment data={item} />}
        />
      </Container>
    </Background>
  );
}

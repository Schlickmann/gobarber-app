/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useContext, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';

import { appointmentContext } from '~/contexts/AppointmentContext';
import { userContext } from '~/contexts/UserContext';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const dateFormatted = useMemo(() => format(date, 'MMMM do'), [date]);

  const { user } = useContext(userContext);
  const { appointments, appointmentsRequest } = useContext(appointmentContext);

  useEffect(() => {
    function loadDashboard() {
      appointmentsRequest({ userId: user.id, date });
    }
    if (user) {
      loadDashboard();
    }
  }, [user, date]);

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

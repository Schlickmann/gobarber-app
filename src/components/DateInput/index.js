import React, { useState, useMemo } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '~/styles/colors';
import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [show, setShow] = useState(false);
  const dateFormatted = useMemo(() => format(date, 'MMM dd, yyyy'), [date]);

  function handleChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  }

  return (
    <Container>
      <DateButton onPress={() => setShow(!show)}>
        <Icon name="event" size={20} color={Colors.light} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {show && (
        <Picker>
          <DateTimePicker
            value={date}
            onChange={handleChange}
            minimumDate={new Date()}
            minuteInterval={60}
            mode="date"
            display="spinner"
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

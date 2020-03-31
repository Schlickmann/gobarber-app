import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '~/styles/colors';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data }) {
  return (
    <Container>
      <Left>
        <Avatar
          source={{ uri: 'https://api.adorable.io/avatar/50/juliani.png' }}
        />

        <Info>
          <Name>juliani schlickmann</Name>
          <Time>em 3 horas</Time>
        </Info>
      </Left>
      <TouchableOpacity onPress={() => false}>
        <Icon name="event-busy" size={20} color={Colors.secondary} />
      </TouchableOpacity>
    </Container>
  );
}

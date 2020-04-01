import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Colors from '~/styles/colors';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 30px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: ${Colors.light};
  margin-left: 15px;
`;

export const Picker = styled.View`
  background-color: ${Platform.OS === 'android' ? 'transparent' : Colors.light};
  padding: 15px 30px;
  margin-top: 30px;
`;

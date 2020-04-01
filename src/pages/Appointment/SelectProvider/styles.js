import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProviderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const Provider = styled(RectButton)`
  background-color: ${Colors.light};
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  align-items: center;
  margin: 0 10px 20px;
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.dark};
  text-align: center;
  text-transform: capitalize;
`;

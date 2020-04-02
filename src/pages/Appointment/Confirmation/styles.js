import styled from 'styled-components/native';

import Button from '~/components/Button';
import Colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;

  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`;

export const Name = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.light};
  text-align: center;
  text-transform: capitalize;
`;

export const Time = styled.Text`
  margin-top: 4px;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.light};
  text-align: center;
  opacity: 0.6;
  /* text-transform: capitalize; */
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  align-self: stretch;
`;

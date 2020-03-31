import styled from 'styled-components/native';
import Colors from '~/styles/colors';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background-color: ${props =>
    !props.cancelable && !props.past ? Colors.secondary : Colors.light};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.5 : 1)};
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
  color: ${props =>
    !props.cancelable && !props.past ? Colors.light : Colors.dark};
`;

export const Time = styled.Text`
  color: ${props =>
    !props.cancelable && !props.past ? Colors.primary : Colors.secondary};
  font-size: 13px;
  margin-top: 4px;
`;

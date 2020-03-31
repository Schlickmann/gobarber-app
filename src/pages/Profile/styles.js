import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.secondary};
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${Colors.light};
  opacity: 0.3;
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

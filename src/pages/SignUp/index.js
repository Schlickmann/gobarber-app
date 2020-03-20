import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'react-native';

import Background from '~/components/Background';
// import { Container } from './styles';

export default function SignUp({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;

  return (
    <Background>
      <Text>Sign up</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('SignIn', {})}
      />
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.number,
      otherParam: PropTypes.string,
    }),
  }).isRequired,
};

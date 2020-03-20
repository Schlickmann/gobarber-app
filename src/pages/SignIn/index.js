import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Image } from 'react-native';

import logo from '~/assets/logo.svg';
import Background from '~/components/Background';
// import { Container } from './styles';

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Text>Sign in</Text>
      <Image source={logo} height={100} />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('SignUp', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.svg';
import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';
// import { Container } from './styles';

export default function SignIn({ navigation }) {
  return (
    <Background>
      <Input
        style={{ marginTop: 30 }}
        icon="mail"
        placeholder="Inform your email..."
      />
      <Button>Sign In</Button>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

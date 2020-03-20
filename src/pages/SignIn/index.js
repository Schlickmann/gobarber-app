import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function SignIn({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Sign in</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('SignUp', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </SafeAreaView>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

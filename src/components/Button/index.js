import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '~/styles/colors';
import { Container, Text } from './styles';

function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.light} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};
Button.defaultProps = {
  loading: false,
};

export default Button;

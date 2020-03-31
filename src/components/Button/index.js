import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '~/styles/colors';
import { Container, Text } from './styles';

function Button({ children, loading, color, ...rest }) {
  return (
    <Container color={color} {...rest}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={color === Colors.light ? Colors.primary : Colors.light}
        />
      ) : (
        <Text color={color}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string,
};
Button.defaultProps = {
  loading: false,
  color: Colors.light,
};

export default Button;

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '~/styles/colors';
import { Container, TInput } from './styles';

const Input = forwardRef(({ style, icon, ...rest }, ref) => {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color={Colors.secondary} />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
});

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default Input;

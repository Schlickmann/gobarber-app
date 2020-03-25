import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import { authContext } from '~/contexts/AuthContext';
import Routes from '~/routes';

import Background from '~/components/Background';
import Colors from '~/styles/colors';

export default function App() {
  const { signed, isRetrievingData } = useContext(authContext);

  if (isRetrievingData) {
    return (
      <Background>
        <ActivityIndicator size="large" color={Colors.light} />
      </Background>
    );
  }

  return <Routes isSigned={signed} />;
}

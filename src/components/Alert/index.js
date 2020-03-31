import { Alert } from 'react-native';

function AsyncAlert(title, message) {
  return new Promise(resolve => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            resolve('OK');
          },
        },
      ],
      { cancelable: false }
    );
  });
}

export default AsyncAlert;

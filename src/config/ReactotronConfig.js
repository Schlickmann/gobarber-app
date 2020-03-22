import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  // configure({ host: IP })
  // android adb reverse tcp:9090 tcp:9090
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}

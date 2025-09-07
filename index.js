/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import crashlytics from '@react-native-firebase/crashlytics'

const globalErrorHandler = (error, isFatal) => {
  if (__DEV__) {
    console.error(error);
  } else {
    crashlytics().recordError(error); // Reporta a Firebase
  }
};

if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler(globalErrorHandler);
}



AppRegistry.registerComponent(appName, () => App)

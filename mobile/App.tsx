import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { Text } from 'react-native';
import HomeNavigator from './src/navigation/HomeNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <HomeNavigator/>
    </NavigationContainer>
  );
}

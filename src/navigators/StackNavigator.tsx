import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogIn } from '../screens/LogIn';
import { Register } from '../screens/Register';
import { BottomTabNavigator } from './BottonTabNavigator';
import { Wallpaper } from '../screens/Wallpaper';
import { DevTool } from '../screens/DevTool';
import { ProfileCharacter } from '../screens/ProfileCharacter';
import { RecoverAccount } from '../screens/RecoverAccount';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='LogIn'>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Wallpaper" component={Wallpaper} options={{ headerShown: false }} />
      <Stack.Screen name="DevTool" component={DevTool} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileCharacter" component={ProfileCharacter} options={{ headerShown: false }} />
      <Stack.Screen name="RecoverAccount" component={RecoverAccount} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}
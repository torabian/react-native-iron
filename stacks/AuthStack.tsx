import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ChangePassword} from '~/modules/authentication/ChangePassword';
import {ForgotPassword} from '~/modules/authentication/ForgotPassword';
import {Signin} from '~/modules/authentication/Signin';
import {SigninByPhone} from '~/modules/authentication/SigninByPhone';
import {Signup} from '~/modules/authentication/Signup';
import {Screens} from '~/stacks/Screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Screens.Signin}>
      <Stack.Screen name={Screens.Signin} component={Signin} />
      <Stack.Screen name={Screens.Signup} component={Signup} />
      <Stack.Screen name={Screens.SigninByPhone} component={SigninByPhone} />
      <Stack.Screen name={Screens.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Screens.ChangePassword} component={ChangePassword} />
    </Stack.Navigator>
  );
};

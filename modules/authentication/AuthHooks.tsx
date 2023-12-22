import AsyncStorage from '@react-native-async-storage/async-storage';
import {FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import colors from '~/constants/colors';

import {BasicUserAuthForm} from '~/interfaces/Auth';

export function useRememberingLoginForm(
  formik: React.MutableRefObject<
    FormikProps<BasicUserAuthForm> | null | undefined
  >,
) {
  const [remember, setRememberState] = useState(false);

  const rememberCredentials = () => {
    setRememberState(r => !r);
    Promise.resolve(
      AsyncStorage.setItem('remember_credentials', `${!remember}`),
    );
  };

  const bootScreen = async () => {
    const state = await AsyncStorage.getItem('remember_credentials');
    if (state !== 'true') {
      return;
    }

    setRememberState(true);

    const cred = await AsyncStorage.getItem('credentials');

    try {
      if (!cred) {
        return;
      }

      const d = JSON.parse(cred);
      if (d && d.email && d.password) {
        formik.current?.setValues({email: d.email, password: d.password});
      }
    } catch (error) {
      // Intentially left blank. No need to handle this type of error
    }
  };

  useEffect(() => {
    bootScreen();
  }, []);

  let thumbColor = colors.white;
  let trackColor = {
    true: colors.primaryColor,
    false: colors.graySwitchBg,
  };

  const RememberSwitch = () => (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Switch
        thumbColor={thumbColor}
        trackColor={trackColor}
        value={remember || false}
        onValueChange={rememberCredentials}
      />
      <Text
        style={{
          marginLeft: 15,
          alignSelf: 'center',
          color: colors.primaryColor,
        }}>
        Remember my credentials
      </Text>
    </View>
  );

  return {RememberSwitch};
}

import React, {useEffect, useRef} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import colors from '~/constants/colors';

import Background from '../../assets/illustrations/login-background.svg';

import {FormikProps} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import t from '~/constants/t';
import {BasicUserAuthForm} from '~/interfaces/Auth';

import {useKeyboardVisibility} from '~/hooks/useKeyboardVisibility';
import UserIcon from '../../assets/icons/account.svg';
import PasswordIcon from '../../assets/icons/lock.svg';
import {FormText, FormTextProps} from '../../components/form-text/FormText';

export const CommonScrollForm = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  const scrollView = useRef<KeyboardAwareScrollView>();
  const {keyboardVisible} = useKeyboardVisibility();
  useEffect(() => {
    if (scrollView && keyboardVisible) {
      scrollView.current?.scrollToEnd();
    }
  }, [scrollView, keyboardVisible]);

  return (
    <KeyboardAwareScrollView
      scrollsToTop
      ref={ref => {
        if (ref) scrollView.current = ref;
      }}
      keyboardShouldPersistTaps="always"
      style={styles.wrapper}
      contentContainerStyle={{flexGrow: 1}}>
      <AuthHeader title={title} />
      <View style={[styles.loginCard]}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export const EmailInput = ({
  formik,
  ...rest
}: {
  formik: FormikProps<BasicUserAuthForm>;
} & FormTextProps) => {
  const {values, setFieldValue, errors} = formik;

  return (
    <FormText
      {...rest}
      value={values.email}
      label={t.username}
      Icon={() => <UserIcon />}
      onChange={value => setFieldValue('email', value)}
      errorMessage={errors.email}
      keyboardType="email-address"
      autoCapitalize={'none'}
      autoCorrect={false}
      returnKeyType="next"
      blurOnSubmit={false}
    />
  );
};

export const PasswordInput = ({
  formik,
  ...rest
}: {
  formik: FormikProps<BasicUserAuthForm>;
} & FormTextProps) => {
  const {values, setFieldValue, errors} = formik;

  return (
    <FormText
      {...rest}
      secureTextEntry
      label={t.password}
      value={formik.values.password}
      errorMessage={formik.errors.password}
      Icon={() => <PasswordIcon />}
      onChange={value => formik.setFieldValue('password', value)}
      returnKeyType="done"
    />
  );
};

export const AuthHeader = ({title}: {title: string}) => {
  return (
    <>
      <Text style={styles.fluidTitle}>{title}</Text>
      <View
        style={{
          backgroundColor: colors.primaryColor,
          position: 'absolute',
          zIndex: 1,
          height: 130,
          left: -200,
          right: -150,
          transform: [{scale: 1}],
        }}></View>
      <StatusBar
        backgroundColor={colors.primaryColor}
        barStyle={'light-content'}></StatusBar>
    </>
  );
};

const styles = StyleSheet.create({
  register: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  registerAction: {
    textDecorationLine: 'underline',
    color: colors.primaryColor,
  },
  registerLabel: {
    color: colors.grayText,
  },
  loginCard: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    borderTopLeftRadius: 60,
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  loginCardSmall: {borderTopLeftRadius: 0},
  submit: {
    marginTop: 30,
  },
  title: {
    fontSize: 27,
    color: colors.white,
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
  },
  backgroundImg: {
    position: 'absolute',
  },
  sampleDeviceImg: {
    alignSelf: 'center',
    marginVertical: 80,
    width: 180,
    height: 190,
  },
  fluidTitle: {
    position: 'absolute',
    zIndex: 99,
    fontSize: 30,
    color: colors.white,
    top: 30,
    left: 40,
  },
});

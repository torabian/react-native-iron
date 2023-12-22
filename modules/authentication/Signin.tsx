import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EmailAccountSigninDto} from 'fireback-tools/modules/passports';
import {usePostPassportSigninEmail} from 'fireback-tools/modules/passports/usePostPassportSigninEmail';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useRef} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {useQueryClient} from 'react-query';
import {ErrorsView} from '~/components/error-view/ErrorView';
import colors from '~/constants/colors';
import t from '~/constants/t';
import {saveCredentials} from '~/helpers/auth';
import {setSession} from '~/helpers/token';
import {FormButton} from '../../components/form-button/FormButton';
import {Screens} from '../../stacks/Screens';
import {CommonScrollForm, EmailInput, PasswordInput} from './AuthComponents';
import {useRememberingLoginForm} from './AuthHooks';

const initialValues: EmailAccountSigninDto = {
  email: '',
  password: '',
};

export const Signin = () => {
  const formik = useRef<FormikProps<EmailAccountSigninDto> | null>();
  const passwordRef = useRef<TextInput | null>();
  const {RememberSwitch} = useRememberingLoginForm(formik);
  const navigation = useNavigation<NavigationProp<any>>();
  const queryClient = useQueryClient();

  const {mutation, submit} = usePostPassportSigninEmail({
    queryClient,
  });

  const onSubmit = (
    values: EmailAccountSigninDto,
    formikProps: FormikHelpers<EmailAccountSigninDto>,
  ) => {
    submit(values, formikProps as any).then(response => {
      if (response.data) {
        setSession(response.data);
        saveCredentials(values);
        navigation.navigate('app', {screen: Screens.Home});
      }
    });
  };

  return (
    <CommonScrollForm title={'Sign-in to \nyour account'}>
      <Formik
        innerRef={p => {
          if (p) formik.current = p;
        }}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik: FormikProps<EmailAccountSigninDto>) => {
          return (
            <>
              <ErrorsView errors={formik.errors} />
              <EmailInput
                formik={formik}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />

              <PasswordInput
                formik={formik}
                getInputRef={r => (passwordRef.current = r)}
                onSubmitEditing={() => {
                  formik.submitForm();
                }}
              />

              <RememberSwitch />

              <FormButton
                isSubmitting={mutation.isLoading}
                onPress={() => formik.submitForm()}
                style={styles.submit}
                label={t.loginButton}
              />
              <Text
                style={{
                  color: colors.darkBackground,
                  textAlign: 'center',
                  marginHorizontal: 10,
                }}>
                {t.firstTime}
              </Text>
              <FormButton
                type="secondary"
                onPress={() => {
                  navigation.navigate('auth', {screen: Screens.Signup});
                }}
                label={t.createAccount}
              />

              <FormButton
                type="secondary"
                onPress={() => {
                  navigation.navigate('auth', {screen: Screens.ForgotPassword});
                }}
                label={t.forgotPassword}
              />
            </>
          );
        }}
      </Formik>
    </CommonScrollForm>
  );
};

const styles = StyleSheet.create({
  submit: {
    marginTop: 30,
  },
});

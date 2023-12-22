import {useNavigation} from '@react-navigation/native';
import {
  EmailAccountSigninDto,
  EmailAccountSignupDto,
} from 'fireback-tools/modules/passports';

import {usePostPassportSignupEmail} from 'fireback-tools/modules/passports/usePostPassportSignupEmail';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useRef} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {ErrorsView} from '~/components/error-view/ErrorView';
import colors from '~/constants/colors';
import t from '~/constants/t';
import {saveCredentials} from '~/helpers/auth';
import {setSession} from '~/helpers/token';
import {FormButton} from '../../components/form-button/FormButton';
import {Screens} from '../../stacks/Screens';
import {CommonScrollForm, EmailInput, PasswordInput} from './AuthComponents';
import {AuthConstants} from './Constants';
import {useQueryClient} from 'react-query';
import {FormText} from '~/components/form-text/FormText';

const initialValues: EmailAccountSigninDto = {
  email: '',
  password: '',
};

export const Signup = () => {
  const formik = useRef<FormikProps<EmailAccountSignupDto> | null>();
  const passwordRef = useRef<TextInput | null>();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const {submit, mutation: mutationPostPassportSignupEmail} =
    usePostPassportSignupEmail({queryClient});

  const onSubmit = (
    values: EmailAccountSignupDto,
    formikProps: FormikHelpers<EmailAccountSignupDto>,
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
    <CommonScrollForm title={'Create your account'}>
      <Formik
        innerRef={p => {
          if (p) formik.current = p;
        }}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik: FormikProps<EmailAccountSignupDto>) => {
          return (
            <>
              <ErrorsView errors={formik.errors} />
              <FormText
                value={formik.values.firstName}
                label={t.firstName}
                onChange={value => formik.setFieldValue('firstName', value)}
                errorMessage={formik.errors.firstName}
              />
              <FormText
                value={formik.values.lastName}
                label={t.lastName}
                onChange={value => formik.setFieldValue('lastName', value)}
                errorMessage={formik.errors.lastName}
              />
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

              <FormButton
                isSubmitting={mutationPostPassportSignupEmail.isLoading}
                onPress={() => formik.submitForm()}
                style={styles.submit}
                label={t.createAccount}
              />
              <Text
                style={{
                  color: colors.darkBackground,
                  textAlign: 'center',
                  marginHorizontal: 10,
                }}>
                {t.alreadyHaveAccount}
              </Text>
              <FormButton
                type="secondary"
                onPress={() => {
                  navigation.navigate('auth', {screen: Screens.Signin});
                }}
                label={t.signinInstead}
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

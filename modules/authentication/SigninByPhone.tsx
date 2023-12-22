import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useMutation} from 'react-query';
import {ErrorsView} from '~/components/error-view/ErrorView';
import {FormCodeField} from '~/components/form-code-field/FormCodeField';
import {FormPhone} from '~/components/form-phone/FormPhone';
import colors from '~/constants/colors';
import {mutationErrorsToFormik} from '~/helpers/api';
import {setSession} from '~/helpers/token';
import {
  LoginFormResponse,
  PhoneAuthForm,
  SmsAuthResponse,
} from '~/interfaces/Auth';
import {FormButton} from '../../components/form-button/FormButton';
import {Screens} from '../../stacks/Screens';
import {CommonScrollForm} from './AuthComponents';
import {AuthInteractionPool} from './AuthInteractionPool';
import {TimerUntil} from './TimerUntil';

const initialValues: PhoneAuthForm = {
  phoneNumber: '',
  activationCode: '',
};

enum SmsAuthState {
  Initial = 'initial',
  VerifyCode = 'verify',
}

export const SigninByPhone = () => {
  const formik = useRef<FormikProps<PhoneAuthForm> | null>();
  const navigation = useNavigation<NavigationProp<any>>();

  const [state, setState] = useState<{
    name: SmsAuthState;
    frozenUntil?: string;
  }>({
    name: SmsAuthState.Initial,
    frozenUntil: '',
  });

  const tryDifferentNumber = () => {
    setState({
      name: SmsAuthState.Initial,
    });

    formik.current?.resetForm();
  };

  const requestSmsMutation = useMutation<
    SmsAuthResponse,
    unknown,
    PhoneAuthForm
  >(params => {
    return AuthInteractionPool.requestSmsAuth(params);
  });

  const loginWithPhoneAndKeyMutation = useMutation<
    LoginFormResponse,
    unknown,
    PhoneAuthForm
  >(params => {
    return AuthInteractionPool.loginBySms(params);
  });

  const sendSMSRequest = (
    values: PhoneAuthForm,
    formik: FormikHelpers<PhoneAuthForm>,
  ) => {
    formik.setErrors({});
    requestSmsMutation.mutate(values, {
      onSuccess(response) {
        setState(() => {
          return {
            name: SmsAuthState.VerifyCode,
            frozenUntil: response?.data?.frozenUntil,
          };
        });
      },
      onError(error: any) {
        if (error.data) {
          setState(() => {
            return {
              name: SmsAuthState.VerifyCode,
              frozenUntil: error?.data?.frozenUntil,
            };
          });
        }
        formik.setErrors(mutationErrorsToFormik(error));
      },
    });
  };

  const onSubmit = (
    values: PhoneAuthForm,
    formikProps: FormikHelpers<PhoneAuthForm>,
  ) => {
    if (state.name === SmsAuthState.Initial) {
      sendSMSRequest(values, formikProps);
    } else {
      formikProps.setErrors({});
      loginWithPhoneAndKeyMutation.mutate(values, {
        onSuccess(response) {
          if (response?.data?.item?.token) {
            setSession(response.data.item);
            navigation.navigate('app', {screen: Screens.Home});
          }
        },
        onError(error: any) {
          formikProps.setErrors(mutationErrorsToFormik(error));
        },
      });
    }
  };

  const isSubmitting =
    requestSmsMutation.isLoading || loginWithPhoneAndKeyMutation.isLoading;

  return (
    <CommonScrollForm title={'Sign-in with\nPhone number'}>
      <Formik
        innerRef={p => {
          if (p) formik.current = p;
        }}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik: FormikProps<PhoneAuthForm>) => {
          const {setFieldValue, values} = formik;

          return (
            <>
              <Text style={styles.description}>
                Login or signup to the app using your phone number
              </Text>

              <ErrorsView errors={formik.errors} />
              <View style={{paddingTop: 20}}></View>
              {state.name === SmsAuthState.Initial ? (
                <FormPhone
                  value={values.phoneNumber}
                  onChange={value => setFieldValue('phoneNumber', value)}
                />
              ) : (
                <Text style={styles.phoneNumberPreview}>
                  {values.phoneNumber}
                </Text>
              )}

              {state.frozenUntil && (
                <TimerUntil
                  onResend={() => sendSMSRequest(values, formik)}
                  until={state.frozenUntil}
                />
              )}

              {state.name !== SmsAuthState.Initial && (
                <TouchableOpacity onPress={tryDifferentNumber}>
                  <Text style={styles.subAction}>Try a different number</Text>
                </TouchableOpacity>
              )}

              {state.name !== SmsAuthState.Initial ? (
                <FormCodeField
                  value={values.activationCode}
                  onChange={value => setFieldValue('activationCode', value)}
                />
              ) : null}

              <FormButton
                isSubmitting={isSubmitting}
                onPress={() => formik.submitForm()}
                style={styles.submit}
                label={
                  state.name === SmsAuthState.Initial
                    ? 'Send SMS code'
                    : 'Verify'
                }
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
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
  subAction: {
    textAlign: 'center',
    marginVertical: 20,
    color: colors.primaryColor,
  },
  phoneNumberPreview: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  secondsLeft: {
    marginTop: 10,
    textAlign: 'center',
  },
});

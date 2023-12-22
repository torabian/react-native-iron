import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation} from 'react-query';
import {ErrorsView} from '~/components/error-view/ErrorView';
import {FormText} from '~/components/form-text/FormText';
import t from '~/constants/t';
import {mutationErrorsToFormik} from '~/helpers/api';
import {setSession} from '~/helpers/token';
import {ChangePasswordAuthForm, LoginFormResponse} from '~/interfaces/Auth';
import {FormButton} from '../../components/form-button/FormButton';
import {Screens} from '../../stacks/Screens';
import {CommonScrollForm} from './AuthComponents';
import {AuthInteractionPool} from './AuthInteractionPool';
import {PasswordCase} from './PasswordCase';

const initialValues: ChangePasswordAuthForm = {
  password1: '',
  password2: '',
};

const logics = [
  (t: string) => t?.length >= 6,
  (t: string) => /[0-9]/.test(t),
  (t: string, t2: string) => t === t2,
];

const doesMeetCondition = (input: string, repeatPassword: string) => {
  if (input !== repeatPassword) {
    return false;
  }

  return logics.every(logic => logic(input, repeatPassword));
};

export const ChangePassword = () => {
  const formik = useRef<FormikProps<ChangePasswordAuthForm> | null>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [displayPasswordRequirements, setDisplayPasswordRequirements] =
    useState<boolean>(false);
  const mutation = useMutation<
    LoginFormResponse,
    unknown,
    ChangePasswordAuthForm
  >(content => {
    return AuthInteractionPool.changePassword({password: content.password1});
  });

  const onSubmit = (
    values: ChangePasswordAuthForm,
    formikProps: FormikHelpers<ChangePasswordAuthForm>,
  ) => {
    mutation.mutate(values, {
      onSuccess(response) {
        if (response.data) {
          setSession(response.data.item);
          navigation.navigate('app', {screen: Screens.Home});
        }
      },
      onError(error: any) {
        formikProps.setErrors(mutationErrorsToFormik(error));
      },
    });
  };

  return (
    <CommonScrollForm title={'Change account\npassword'}>
      <Formik
        innerRef={p => {
          if (p) formik.current = p;
        }}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik: FormikProps<ChangePasswordAuthForm>) => {
          const {values} = formik;
          return (
            <>
              <ErrorsView errors={formik.errors} />
              {displayPasswordRequirements && (
                <View style={{marginVertical: 10}}>
                  <PasswordCase input={values.password1} logic={logics[0]}>
                    Be a minimum of 6 characters
                  </PasswordCase>
                  <PasswordCase input={values.password1} logic={logics[1]}>
                    Digit (0-9)
                  </PasswordCase>
                </View>
              )}
              <FormText
                value={formik.values.password1}
                label={t.password}
                onChange={value => {
                  if (!displayPasswordRequirements) {
                    setDisplayPasswordRequirements(true);
                  }
                  formik.setFieldValue('password1', value);
                }}
                errorMessage={formik.errors.password1}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <FormText
                value={formik.values.password2}
                label={t.repeatPassword}
                onChange={value => formik.setFieldValue('password2', value)}
                errorMessage={formik.errors.password2}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry
                returnKeyType="next"
                blurOnSubmit={false}
              />

              <FormButton
                isSubmitting={mutation.isLoading}
                onPress={() => formik.submitForm()}
                style={styles.submit}
                label={t.resetPasswordNow}
                disabled={
                  !doesMeetCondition(values.password1, values.password2)
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
});

import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useEffect, useRef} from 'react';

import Toast from 'react-native-toast-message';
import {UserProfileDto} from 'fireback-tools/modules/workspaces';
import {useWorkspaces as useUsers} from 'fireback-tools/modules/workspaces/user-react';
import {StyleSheet, View} from 'react-native';
import {Card} from '~/components/card/Card';
import {ErrorsView} from '~/components/error-view/ErrorView';
import {FormButton} from '~/components/form-button/FormButton';
import {FormText} from '~/components/form-text/FormText';
import {PageTitle} from '~/components/page-title/PageTitle';

import t from '~/constants/t';
import {useRxjs} from '~/hooks/useRxjs';
import {store} from '~/store/Store';
import {AuthConstants} from '../authentication/Constants';

const initialValues: UserProfileDto = {
  firstName: '',
  lastName: '',
};

export const UserSettingsScreen = ({}: {}) => {
  const [session] = useRxjs(store.session);

  const options = {
    prefix: AuthConstants.url,
    headers: {
      authorization: session?.token || '',
    },
  };

  const {
    mutationPostprofile: mutation,
    submitPostprofile,
    profileQuery,
  } = useUsers({
    options,
  });

  const formik = useRef<FormikProps<UserProfileDto> | null>();
  useEffect(() => {
    if (profileQuery.data) {
      formik.current?.setValues(profileQuery.data?.data as any);
    }
  }, [profileQuery.data?.data]);

  const onSubmit = (
    values: UserProfileDto,
    formikProps: FormikHelpers<UserProfileDto>,
  ) => {
    submitPostprofile(values, formikProps).then(response => {
      Toast.show({
        type: 'info',
        text1: 'Success',
        text2: 'Profile has been saved',
        autoHide: true,
      });
    });
  };

  return (
    <View style={styles.wrapper}>
      <PageTitle title="User Settings"></PageTitle>
      <Card>
        <Formik
          innerRef={p => {
            if (p) formik.current = p;
          }}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {(formik: FormikProps<UserProfileDto>) => {
            const {values} = formik;
            return (
              <>
                <ErrorsView errors={formik.errors} />

                <FormText
                  value={formik.values.firstName}
                  label={t.firstName}
                  onChange={value => {
                    formik.setFieldValue('firstName', value);
                  }}
                  errorMessage={formik.errors.firstName}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
                <FormText
                  value={formik.values.lastName}
                  label={t.lastName}
                  onChange={value => formik.setFieldValue('lastName', value)}
                  errorMessage={formik.errors.lastName}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  blurOnSubmit={false}
                />

                <FormButton
                  isSubmitting={mutation.isLoading}
                  onPress={() => formik.submitForm()}
                  label={t.updateProfile}
                />
              </>
            );
          }}
        </Formik>
      </Card>
      {/* <SocketConnection /> */}
      {/* <Canvas onTouch={touchHandler} style={{flex: 1, width, height}}>
        <Rect x={xPos} y={100} width={10} height={10} color="red" />
      </Canvas> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});

import {Formik, FormikHelpers, FormikProps} from 'formik';
import React, {useEffect, useRef} from 'react';

import {StyleSheet, View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {FormButton} from '~/components/form-button/FormButton';
import {Wizard} from '~/components/wizard/Wizard';
import t from '~/constants/t';
import {mutationErrorsToFormik} from '~/helpers/api';
import {IResponse, IResponseList} from '~/interfaces/JSONStyle';
import {BookDto} from './BookDto';
import {BookEditForm} from './BookEditForm';
import {BookEntityValidator} from './BookEntityValidator';
import {BooksInteractionPool} from './BookInteractionPool';
import {bookWizardSteps} from './BookWizardHelper';

export const BookEntity = ({
  data,
  asWizard,
  fnClose,
}: {
  asWizard?: boolean;
  data?: BookDto.DTO | null;
  fnClose: () => void;
}) => {
  const isEditingMode = !!data;
  const formik = useRef<FormikProps<BookDto.DTO> | null>();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, BookDto.DTO>(content => {
    if (!isEditingMode) {
      return BooksInteractionPool.create(content);
    }
    return BooksInteractionPool.update(content);
  });

  /**
   * Do not use 'data' in the hook callback. We do not want if the data is changed,
   * the form which user is changing to be changed, or lost. In such event,
   * we need to inform user and ask for next correct step, either save as draft.
   */
  useEffect(() => {
    if (data) {
      formik.current?.setValues(data);
    }
  }, [data]);

  const fnUpdater = (
    data: IResponseList<BookDto.DTO> | undefined,
    item: IResponse<BookDto.DTO>,
  ) => {
    if (!data) {
      return {
        data: {items: []},
      };
    }

    if (isEditingMode && data?.data?.items && item.data) {
      data.data.items = data.data.items.map(t => {
        if (item.data !== undefined && BookDto.isEqual(t, item.data)) {
          return item.data;
        }

        return t;
      });
    } else if (data?.data && item.data) {
      data.data.items = [item.data, ...(data?.data?.items || [])];
    }

    return data;
  };

  const onSubmit = (
    values: BookDto.DTO,
    formikProps: FormikHelpers<BookDto.DTO>,
  ) => {
    mutation.mutate(values, {
      onSuccess(response: IResponse<BookDto.DTO>) {
        queryClient.setQueryData<IResponseList<BookDto.DTO>>('Books', data =>
          fnUpdater(data, response),
        );
        if (fnClose) fnClose();
      },

      onError(error: any) {
        formikProps.setErrors(mutationErrorsToFormik(error));
      },
    });
  };

  useEffect(() => {
    formik.current?.setSubmitting(mutation.isLoading);
  }, [mutation.isLoading]);

  return (
    <View style={styles.wrapper}>
      <Formik
        innerRef={p => {
          if (p) formik.current = p;
        }}
        validationSchema={BookEntityValidator}
        initialValues={BookDto.Empty}
        onSubmit={onSubmit}>
        {(form: FormikProps<BookDto.DTO>) => {
          if (asWizard) {
            return (
              <Wizard
                leftOffset={20}
                contentStyle={{paddingHorizontal: 0}}
                steps={bookWizardSteps}
                divider={false}
                formik={form}
              />
            );
          }

          return (
            <>
              <BookEditForm form={form} />
              <FormButton
                isSubmitting={form.isSubmitting}
                onPress={() => form.submitForm()}
                style={styles.submit}
                label={t.save}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  submit: {
    marginTop: 30,
  },
});

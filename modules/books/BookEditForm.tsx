import {FormikProps} from 'formik';
import React from 'react';
import {FormDate} from '~/components/form-date/FormDate';
import {FormSwitch} from '~/components/form-switch/FormSwitch';

import {FormText} from '~/components/form-text/FormText';
import {BookDto} from './BookDto';

/**
 * These steps are the same form which as been split into 3 different components
 * which is helpful for very long forms or, when you want to use Wizards, as you might see
 * in BookWizardHelper.ts - If you are sure you won't need it, combine them into one
 * for simpler forms.
 */
export const BookEditFormStep1 = ({form}: {form: FormikProps<BookDto.DTO>}) => {
  const {values, setFieldValue, errors} = form;

  return (
    <>
      {/* <Text>{JSON.stringify(form.values)}</Text> */}
      {/* @meta(as:string,name:title,label:Title) */}
      <FormText
        value={values.title || ''}
        label={'Title'}
        onChange={value => setFieldValue('title', value)}
        errorMessage={errors.title}
        autoCapitalize={'none'}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
      />

      <FormText
        value={values.country || ''}
        label={'Country'}
        onChange={value => setFieldValue('country', value)}
        errorMessage={errors.country}
        autoCapitalize={'none'}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </>
  );
};
export const BookEditFormStep2 = ({form}: {form: FormikProps<BookDto.DTO>}) => {
  const {values, setFieldValue, errors} = form;

  return (
    <>
      {/* @meta(as:switch) */}
      <FormSwitch
        label="Allow underage access"
        onChange={value => setFieldValue('underAgeAccess', value)}
        value={values.underAgeAccess}
      />

      {/* @meta(as:datepicker) */}
      <FormDate
        label="First release date"
        onChange={value => setFieldValue('firstReleaseDate', value)}
        value={values.firstReleaseDate}
      />
    </>
  );
};
export const BookEditFormStep3 = ({form}: {form: FormikProps<BookDto.DTO>}) => {
  const {values, setFieldValue, errors} = form;

  return (
    <>
      <FormText
        value={values.author || ''}
        label={'Author'}
        onChange={value => setFieldValue('author', value)}
        errorMessage={errors.author}
        autoCapitalize={'none'}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      {/* @meta(as:number,name:year,label:Year) */}
      <FormText
        value={values.year ? `${values.year}` : ''}
        label={'Year'}
        onChange={value => setFieldValue('year', value)}
        errorMessage={errors.year}
        autoCapitalize={'none'}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </>
  );
};

export const BookEditForm = ({form}: {form: FormikProps<BookDto.DTO>}) => {
  return (
    <>
      <BookEditFormStep1 form={form} />
      <BookEditFormStep2 form={form} />
      <BookEditFormStep3 form={form} />
    </>
  );
};

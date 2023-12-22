import * as Yup from 'yup';
import t from '~/constants/t';
import {BookFilterValidator} from './BookFilterValidator';

export const BookEntityValidator = BookFilterValidator.clone().concat(
  // @meta(entityvalidator)
  Yup.object({
    title: Yup.string().nullable().required(t.formValidation.fieldNeccessary),
    country: Yup.string().nullable().required(t.formValidation.fieldNeccessary),
  }),
);

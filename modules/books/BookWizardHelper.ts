import {FormikProps} from 'formik';
import {WizardStep} from '~/components/wizard/WizardHelper';
import {BookDto} from './BookDto';
import {
  BookEditFormStep1,
  BookEditFormStep2,
  BookEditFormStep3,
} from './BookEditForm';

export const bookWizardSteps: WizardStep[] = [
  {
    label: 'Main',
    component: BookEditFormStep1,
    isValid: (formikProps: FormikProps<BookDto.DTO>) => {
      return !formikProps.errors.title;
    },
  },
  {
    label: 'Second',
    component: BookEditFormStep2,
  },
  {
    label: 'Third',
    component: BookEditFormStep3,
  },
];

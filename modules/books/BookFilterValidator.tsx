import * as Yup from 'yup';

/**
 * Filter validator schema considered the default and most important filter for each entity
 * when user is creating or editing, the entity validtor will be used instead.
 * By default, we clone this object and add 'required' yup rule to them. Since when filtering
 * entities, you mostly do not want any field to be required, this object is considered as main one
 * which will be used across all validators. If you need custom one, use Yup.object() and build from
 * scratch the new object.
 */

// @meta(entityvalidator)
export const BookFilterValidator = Yup.object().shape({
  country: Yup.string().matches(/iran|poland/, {
    message: 'It must be iran or poland',
  }),
});

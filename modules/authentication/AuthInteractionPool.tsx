import moment from 'moment';
import {
  ChangePasswordAuthForm,
  EmailAuthForm,
  LoginFormResponse,
  PhoneAuthForm,
  SmsAuthResponse,
} from '~/interfaces/Auth';

let frozenUntilSms: moment.Moment;
let frozenUntilEmail: moment.Moment;

// class AuthInteractionPoolClass {
//   async requestSmsAuth(params: PhoneAuthForm): Promise<SmsAuthResponse> {
//     return new Promise((resolve, reject) => {
//       // Check if already this number is under the check. This is kind of a backend
//       // checking process.

//       if (frozenUntilSms && moment(frozenUntilSms).isAfter(moment())) {
//         return reject({
//           data: {frozenUntil: frozenUntilSms.toString()},
//           error: {
//             message: 'You need to wait in order to resent the sms',
//           },
//         });
//       }
//       if (!params.phoneNumber || params.phoneNumber !== '+480000') {
//         return reject({
//           error: {
//             message: 'Only number +480000 is allowed to login',
//           },
//         });
//       }
//       // Ask for the API to send SMS code
//       if (params.phoneNumber && !params.activationCode) {
//         frozenUntilSms = moment().add(30, 'second');
//         resolve({
//           data: {frozenUntil: frozenUntilSms.toString()},
//         });
//       }
//     });
//   }

//   async requestEmailAuth(params: EmailAuthForm): Promise<SmsAuthResponse> {
//     return new Promise((resolve, reject) => {
//       // Check if already this number is under the check. This is kind of a backend
//       // checking process.

//       if (frozenUntilEmail && moment(frozenUntilEmail).isAfter(moment())) {
//         return reject({
//           data: {frozenUntil: frozenUntilEmail.toString()},
//           error: {
//             message: 'You need to wait in order to resend email',
//           },
//         });
//       }
//       if (!params.email || params.email !== 'ali') {
//         return reject({
//           error: {
//             message: 'Only ali is allowed to login',
//           },
//         });
//       }
//       // Ask for the API to send SMS code
//       if (params.email && !params.activationCode) {
//         frozenUntilEmail = moment().add(30, 'second');
//         resolve({
//           data: {frozenUntil: frozenUntilEmail.toString()},
//         });
//       }
//     });
//   }

//   async changePassword(params: {password: string}): Promise<LoginFormResponse> {
//     return new Promise((resolve, reject) => {
//       if (params.password !== '123456') {
//         return reject({
//           error: {
//             message: 'Password only can be changed to 123456',
//           },
//         });
//       }

//       // In this case user has the phone number and activation code
//       resolve({
//         data: {
//           item: {
//             token: 'token_from_user_password_change',
//             user: {},
//           },
//         },
//       });
//     });
//   }

//   async loginByEmail(params: EmailAuthForm): Promise<LoginFormResponse> {
//     return new Promise((resolve, reject) => {
//       if (params.activationCode !== '000000' || params.email !== 'ali') {
//         return reject({
//           error: {
//             message: 'Verify code is 0 0 0 0 0 0',
//           },
//         });
//       }

//       // In this case user has the phone number and activation code
//       resolve({
//         data: {
//           item: {
//             token: 'token_from_email',
//             user: {},
//           },
//         },
//       });
//     });
//   }

//   async loginBySms(params: PhoneAuthForm): Promise<LoginFormResponse> {
//     return new Promise((resolve, reject) => {
//       if (
//         params.activationCode !== '000000' ||
//         params.phoneNumber !== '+480000'
//       ) {
//         return reject({
//           error: {
//             message: 'Verify code is 0 0 0 0 0 0',
//           },
//         });
//       }

//       // In this case user has the phone number and activation code
//       resolve({
//         data: {
//           item: {
//             token: 'token_from_sms',
//             user: {},
//           },
//         },
//       });
//     });
//   }
// }

// export const AuthInteractionPool = new AuthInteractionPoolClass();

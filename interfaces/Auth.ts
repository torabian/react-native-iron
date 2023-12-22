import {IResponse} from 'fireback-tools/core/http-tools';
import {UserSessionDto} from 'fireback-tools/modules/passports';

export type LoginFormResponse = IResponse<UserSessionDto>;

export type SmsAuthResponse = IResponse<{
  frozenUntil: string;
}>;

export interface ChangePasswordAuthForm {
  password1: string;
  password2: string;
}

export interface BasicUserAuthForm {
  email: string;
  password: string;
  form?: string;
}

export interface PhoneAuthForm {
  phoneNumber?: string;
  activationCode?: string;
}

export interface EmailAuthForm {
  email?: string;
  activationCode?: string;
}

export interface UserSession {
  token: string;
  user: any;
}

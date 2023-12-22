import {BehaviorSubject} from 'rxjs';
import {UserSession} from '~/interfaces/Auth';

export const store = {
  session: new BehaviorSubject<UserSession>({
    token: '',
    user: null,
  }),
};

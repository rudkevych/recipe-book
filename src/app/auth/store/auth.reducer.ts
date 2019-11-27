import { User } from './../user.model';


export interface State {
  user: User;
}

const InitialState =  {
  user: null
};

export function authReducer(state = InitialState, action) {
  return state;
}

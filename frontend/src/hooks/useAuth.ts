import { authServices } from '@views/Auth';
import { useMutation } from 'react-query';

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
  confirmpassword: string;
};

export type ServicesType = Login | Register;

export interface SuccessfulAuthResponse {
  name?: string;
  id?: string;
  email: string;
  message?: string;
  access?: string;
}

type AuthActionTypes = 'login' | 'register';

const useAuth = (action: AuthActionTypes) => {
  return useMutation<SuccessfulAuthResponse, React.ReactNode, ServicesType>(
    (data) => {
      return new Promise((resolve, reject) => {
        switch (action) {
          case 'login':
            resolve(authServices.loginUser(data));
            break;
          case 'register':
            resolve(authServices.registerUser(data));
            break;
        }
        reject((err: string) => err);
      });
    }
  );
};

export default useAuth;

import { authServices } from '@views/Auth';
import { useQuery } from 'react-query';

export const useVerifyAuthToken = () => {
  return useQuery('checkAuthToken', authServices.checkAuthToken);
};

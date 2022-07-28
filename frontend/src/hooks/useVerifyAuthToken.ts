import { authServices } from '@views/Auth';
import { useQuery } from 'react-query';

const useVerifyAuthToken = () => {
  return useQuery('checkAuthToken', authServices.checkAuthToken);
};
export default useVerifyAuthToken;

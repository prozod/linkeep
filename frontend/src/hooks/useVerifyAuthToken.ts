import { accountServices } from "@views/Account";
import { useQuery } from "react-query";

export const useVerifyAuthToken = () => {
  return useQuery("checkAuthToken", accountServices.checkAuthToken);
};

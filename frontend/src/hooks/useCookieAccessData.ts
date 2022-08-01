import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import { IAccessTokenData } from 'types/dataTypes';
import useVerifyAuthToken from './useVerifyAuthToken';
interface ICookieTokenDeconstruct {
  idx: number;
  cookie: string;
}

class AccessTokenProcessor {
  cookie: string;
  idx: number;
  constructor({ cookie, idx }: ICookieTokenDeconstruct) {
    (this.cookie = cookie), (this.idx = idx);
  }

  readCookie() {
    return document.cookie
      ?.split('; ')
      ?.find((ck) => ck.startsWith(`${this.cookie}=`))
      ?.split('=')[this.idx];
  }

  splitJWTPayload(token: string) {
    return token.split('.')[1];
  }

  decodeBase64(data: string) {
    return Buffer.from(data, 'base64').toString('ascii');
  }

  parseToJSON(data: string) {
    return JSON.parse(data);
  }
}

const useCookieAccessData = ({
  cookie,
  idx,
}: ICookieTokenDeconstruct): IAccessTokenData | null => {
  const token = new AccessTokenProcessor({ cookie: cookie, idx: idx });
  const { isError, isSuccess } = useVerifyAuthToken();

  try {
    const data = token.decodeBase64(
      token.splitJWTPayload(token.readCookie() as string)
    );
    localStorage.setItem('isAuthenticated', 'true');
    return token.parseToJSON(data);
  } catch (e: unknown) {
    if (isError) {
      localStorage.removeItem('isAuthenticated');
      console.log('useCookieAccessData', e);
    }
    return null;
  }
};

export default useCookieAccessData;

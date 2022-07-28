import { Buffer } from 'buffer';
import moment from 'moment';

export const decodeB64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

export const parseUnix = (unix: string, decode?: boolean) => {
  if (unix == 'undefined' || unix == null) return;

  if (decode) {
    try {
      const unixdate = JSON.parse(decodeB64(unix)).exp;
      const convert = moment.unix(unixdate).utc().toString();
      return moment.utc(convert).local().format();
    } catch (e: any) {
      localStorage.removeItem('access');
      throw new Error('Invalid JSON', e);
    }
  } else {
    return moment.unix(Number(unix)).utc().toString();
  }
};

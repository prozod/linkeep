const bcrypt = require('bcryptjs');
const saltRounds = 10;
//
export const hashPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (err) reject(err);
      else {
        resolve(hash);
      }
    });
  });

export const comparePassword = (
  userPassword: string,
  dbPassword: string
): Promise<boolean> =>
  new Promise((resolve, reject) =>
    bcrypt.compare(userPassword, dbPassword, (err: any, result: boolean) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    })
  );

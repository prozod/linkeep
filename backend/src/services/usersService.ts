import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetAllUsers = async () => {
  const query = await prisma.user.findMany({});
  console.log(`All users fetched.`);
  return query;
};

export const GetUser = async (userId: string) => {
  const query = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  console.log(`User ${userId} was fetched.`);
  return query;
};

export const CreateNewUser = async (email: string, password: string) => {
  try {
    // check if user exists with that email address
    const check = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(typeof check);

    if (check != null || check != undefined) {
      return `An account with '${email}' already exists in our system.`;
    } else {
      const query = await prisma.user.create({
        data: {
          name: email.split('@')[0],
          email: email,
          password: password,
          // check if passwords are equa in a middleware or idk
          confirmPassword: password,
        },
      });
      console.log(
        `User ${String(email.split('@')[0])} with e-mail ${String(
          email
        )} -> Password ${String(password)} was created.`
      );
      return query;
    }
  } catch (e) {
    console.log('CreateNewUserService Error', e);
  }
};

export const LoginUser = async (email: string) => {
  try {
    const query = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: {
        collections: true,
      },
    });

    console.log('Login Trycatch Service:', query); // returns null - handle it
    // compare password with db!!!!!!
    return query;
  } catch (e) {
    /* handle error */
    console.log('LoginUser Service Error:', e);
  }
};

// refactor to delete user collections aswell
export const DeleteUser = async (userId: string) => {
  const query = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  console.log(`User ${userId} got deleted.`);
  return query;
};

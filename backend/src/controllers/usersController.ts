import usersService = require('../services/usersService');
import { Request, Response } from 'express';
import {
  comparePassword,
  hashPassword,
} from '../middlewares/hashingMiddleware';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
require('dotenv').config();

//@QUERY ALL USERS
export const QueryUsers = async (req: Request, res: Response) => {
  const query = usersService.GetAllUsers();
  res.json(await query);
};

//@QUERY ONE USER
export const QueryUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = usersService.GetUser(id);
  res.json(await query);
};

//@CREATE NEW USER
export const CreateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashed = await hashPassword(password);
  console.log(hashed);
  const query = usersService.CreateNewUser(email, hashed);
  res.json(await query);
};

//@DELETE USER
export const DeleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  const query = usersService.DeleteUser(id);
  res.json(await query);
};

//@DE-AUTHENTICATE USER
export const DeauthenticateUser = async (req: Request, res: Response) => {
  res.clearCookie('refresh');
  res.status(200).send({ message: 'User logged out successfully' });
};

//@AUTHENTICATE USER
export const AuthenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = usersService.LoginUser(email);
  const result = await query;

  // compare client side input password with hashed password from database
  const passwordMatch = await comparePassword(
    password,
    String(result?.password)
  );

  if (result === null) {
    console.log("User doesn't exist in our database.");
    res.status(401).send({
      message: "User doesn't exist in our database.",
    });
  } else if (passwordMatch) {
    const user = {
      id: result?.id,
      name: result?.name,
      email: result?.email,
      collections: result?.collections,
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true, //localhost is http
    });

    res
      .status(200)
      .send({ ...user, access: accessToken, refresh: refreshToken });
  } else {
    console.log(
      "There was an error fetching the user you're looking for, please make sure the credentials are correct."
    );
    res.status(401).send({
      message:
        "There was an error fetching the user you're looking for, please make sure the credentials are correct.",
    });
  }
};

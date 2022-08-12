import usersService = require('../services/usersService');
import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../middlewares/hashing';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
import { UserTokenInfoDTO, UserAuthRequestModel } from '../models/auth.dto';
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
  res.clearCookie('access');
  res.status(200).send({ message: 'User logged out successfully' });
};

//@AUTHENTICATE USER
export const AuthenticateUser = async (req: Request, res: Response) => {
  if (UserAuthRequestModel.safeParse(req.body)) {
    // kinda redundant? because password match below and prisma responses deal with this check (sort of, except pw length)
    const query = usersService.LoginUser(req.body.email);
    const response = await query;

    // compare client side input password with hashed password from database
    const passwordMatch = await comparePassword(
      req.body.password,
      String(response?.password)
    );

    if (response === null) {
      res.status(400).send({
        message: `Email address ${req.body.email} doesn't seem to be registered to any account.`,
      });
    } else if (passwordMatch && response !== undefined) {
      const user: UserTokenInfoDTO = {
        id: response.id,
        name: response.name,
        email: response.email,
      };

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        // secure: true, //localhost is http
      });
      res.cookie('access', accessToken, {
        // httpOnly: true,
        sameSite: 'strict',
        maxAge: 900 * 1000,
        // secure: true, //localhost is http
      });

      res.status(200).send({ ...user, access: accessToken });
    } else {
      res.status(400).send({
        message:
          "There was an error fetching the user you're looking for, please make sure the credentials are correct.",
      });
    }
  } else {
    res.status(400).send({
      message:
        'Bad login data. Email and password are in an incorrect data type.',
    });
  }
};

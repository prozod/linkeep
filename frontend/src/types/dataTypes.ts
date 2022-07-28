type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
  confirmpassword: string;
};

export type UserServicesType = Login | Register;

export interface ICollectionDataResponse {
  id: string;
  createdAt: string | Date;
  items: string[];
  ownerId: string;
  title: string;
  updatedAt: string | Date;
}

export interface IAccessTokenData {
  id: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
}

export type CreateNewCollection = {
  url: string;
};

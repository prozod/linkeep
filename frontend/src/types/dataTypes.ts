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

export interface ICollection {
  createdAt: string;
  id: string;
  ownerId: string;
  title: string;
  updatedAt: string;
}

export interface ICollectionItem {
  id?: string;
  title?: string;
  url: string;
  collectionId: string;
}

export interface ICollectionDataResponse {
  id: string;
  createdAt: string | Date;
  items: ICollectionItem[];
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

export interface ScrapeAPIRes {
  meta: {
    description?: string;
    title?: string;
  };
  og: {
    image?: Image;
    description?: string;
    title?: string;
    site_name?: string;
    type?: string;
    url?: string;
    video?: string;
  };
  twitter?: {
    site?: string;
    creator?: string;
    image?: string;
  };
}

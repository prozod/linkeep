import collectionService = require('../services/collectionService');
import { Request, Response } from 'express';
import { z } from 'zod';
import { app } from '../../server';

//@CREATE NEW COLLECTION
export const CreateCollection = async (req: Request, res: Response) => {
  const query = collectionService.CreateNewCollection(
    req.body.title,
    req.body.id
  );
  res.json(await query);
};

//@CREATE NEW COLLECTION ITEM
export const CreateNewCollectionItem = async (req: Request, res: Response) => {
  // really need to add f**kin' types to this. spent 30mins to debug because i passed wrong req param.
  try {
    const query = collectionService.CreateNewCollectionItem(
      req.body.collectionId,
      req.body.url
    );
    res.json(await query);
  } catch (e) {
    console.log('CollectionItems:', e);
  }
};

//@DELETE COLLECTION ITEM
export const DeleteCollectionItem = async (req: Request, res: Response) => {
  // really need to add  types to this. spent 30mins to debug because i passed wrong req param.
  try {
    const query = collectionService.DeleteCollectionItem(req.body.id);
    app.redisClient.del(`${req.body.url}`);
    res.json(await query);
  } catch (e) {
    console.log('DeletedItems Error', e);
  }
};

//@DELETE COLLECTION
export const DeleteCollection = async (req: Request, res: Response) => {
  // really need to add types to this. spent 30mins to debug because i passed wrong req param.
  try {
    const query = collectionService.DeleteCollection(req.body.id);
    res.json(await query);
  } catch (e) {
    console.log('DeleteCollection Error', e);
  }
};

//@GET USER COLLECTION
//[temp fixed] this fails because previously we were passing the userid from the req.body checkJWT token but now its empty

const RequestBodyTypeGuard = z.object({
  id: z.string().min(6),
  email: z.string(),
});

export const GetUserCollections = async (req: Request, res: Response) => {
  const parsedRequestBody = RequestBodyTypeGuard.safeParse(req.body);
  if (parsedRequestBody.success) {
    const query = collectionService.QueryUserCollection(req.body.id);
    res.json(await query);
  } else {
    res.status(400).send({ ...parsedRequestBody.error });
  }
};

//@GET USER COLLECTION BY ID
export const GetUserCollectionById = async (req: Request, res: Response) => {
  try {
    const query = collectionService.QueryUserCollectionById(
      req.body.id,
      req.params.id
    );
    res.json(await query);
  } catch (e) {
    console.log('GetUserCollectionById:', e);
  }
};

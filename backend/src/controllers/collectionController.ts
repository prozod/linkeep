import collectionService = require('../services/collectionService');
import { Request, Response } from 'express';

//@CREATE NEW COLLECTION
export const CreateCollection = async (req: Request, res: Response) => {
  const query = collectionService.CreateNewCollection(
    req.body.title,
    req.body.id
  );
  res.json(await query);
};

//@UPDATE COLLECTION
export const UpdateCollectionItems = async (req: Request, res: Response) => {
  const query = collectionService.UpdateCollectionItems(
    req.body.id,
    req.body.item
  );
  res.json(await query);
};

//@GET USER COLLECTION
export const GetUserCollections = async (req: Request, res: Response) => {
  console.log('body from getUser', req.body);

  const query = collectionService.QueryUserCollection(req.body.id);
  res.json(await query);
};

//@GET USER COLLECTION BY ID
export const GetUserCollectionById = async (req: Request, res: Response) => {
  console.log('body from getUserById', req.body);
  try {
    const query = collectionService.QueryUserCollectionById(
      req.body.id,
      req.params.id
    );
    console.log('QUERYBYID REQUESTS', req.body.id, req.params.id);
    res.json(await query);
  } catch (e) {
    console.log('ColByIdError:', e);
  }
};

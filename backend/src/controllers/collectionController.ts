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
export const GetUserCollectionItems = async (req: Request, res: Response) => {
  const query = collectionService.QueryUserCollection(req.body.id);
  res.json(await query);
};

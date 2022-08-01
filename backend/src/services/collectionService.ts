import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Create a new collection
export const CreateNewCollection = async (title: string, ownerId: string) => {
  const query = await prisma.collection.create({
    data: {
      title: title,
      ownerId: ownerId,
    },
  });
  console.log(`Collection ${title} was created by ${ownerId}`);
  return query;
};

// Create a new item
export const CreateNewCollectionItem = async (
  collectionId: string,
  url: string
) => {
  try {
    const query = await prisma.item.create({
      data: {
        collectionId: collectionId,
        url: url,
      },
    });
    return query;
  } catch (e) {
    throw new Error(
      'There was an error in the CreateNewCollectionItem function.'
    );
  }
};

// Query the collections belonging to a user (search by id sent from currently logged in)
// select * from collection where ownerid = userid currently logged in (accessToken response), if no collections available, return null;
// GOOGLE: is it better to do two separate db calls or should rather return the user collection when checking for auth/loggin in?

export const QueryUserCollection = async (ownerId: string) => {
  const query = await prisma.collection.findMany({
    where: {
      ownerId: ownerId,
    },
  });
  return query;
};

export const QueryUserCollectionById = async (
  ownerId: string,
  collectionId: string
) => {
  try {
    const query = await prisma.collection.findFirst({
      where: {
        ownerId: ownerId,
        id: collectionId,
      },
      include: {
        items: true,
      },
    });
    if (query == null) {
      throw new Error(
        "Unable to get collection, make sure you're logged in or the collection exists."
      );
    } else {
      return query;
    }
  } catch (e) {
    console.log('QueryUserCollectionById', e);
  }
};

// Delete an item
export const DeleteCollectionItem = async (id: string) => {
  try {
    const query = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    return query;
  } catch (e) {
    throw new Error('There was an error in the DeleteCollectionItem function.');
  }
};

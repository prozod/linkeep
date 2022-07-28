import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new collection
export const CreateNewCollection = async (
  title: string,
  ownerId: string,
  item: Array<string> = [] // ability to add comma separated values in a textfield when creating a collection
) => {
  const query = await prisma.collection.create({
    data: {
      title: title,
      ownerId: ownerId,
      items: item,
    },
  });
  console.log(`Collection ${title} was created by ${ownerId}`);
  return query;
};

// Update items inside an existing collection
export const UpdateCollectionItems = async (
  collectionId: string,
  item: string
) => {
  const query = await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      items: {
        push: item,
      },
    },
  });
  console.log(`Item ${item} added into ${collectionId}`);
  return query;
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

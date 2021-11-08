import { MongoClient } from "mongodb";

export class MongoError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ConnectDbException extends MongoError {}
export class InsertDocumentException extends MongoError {}
export class DuplicateDocumentException extends MongoError {}

export const connectToDb = async () => {
  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://Wlloa:wuj120389@cluster0.kbwyf.mongodb.net/facebook-db?retryWrites=true&w=majority"
    );
  } catch (error: any) {
    throw new ConnectDbException(
      error.message || "Something went wrong connecting to MongoDb"
    );
  }

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collectionName: string,
  document: Record<string, any>
) => {
  let result;
  try {
    const db = client.db();
    const result = await db.collection(collectionName).insertOne(document);
  } catch (error: any) {
    throw new InsertDocumentException(
      error.message || "Something went wrong inserting document into MongoDb"
    );
  }

  return result;
};

export const searchDocumentByEmail = async (
  client: MongoClient,
  collectionName: string,
  email: string
) => {
  const db = client.db();
  const result = await db.collection(collectionName).findOne({email: email});
  return result;
};

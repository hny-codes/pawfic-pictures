// RESOLVE: https://github.com/appwrite/sdk-for-web/issues/54
import { Client, Databases, Account } from 'appwrite';

// ENV API variables
export const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
export const USERS_DATABASE = process.env
  .NEXT_PUBLIC_APPWRITE_USERS_DATABASE_ID as string;
export const USERS_COLLECTION = process.env
  .NEXT_PUBLIC_APPWRITE_USERS_COLLECTION as string;

// Client
const client = new Client();
client.setEndpoint(`${ENDPOINT}`).setProject(`${PROJECT_ID}`);

// Account
export const account = new Account(client);

// Database
export const database = new Databases(client);

export default client;

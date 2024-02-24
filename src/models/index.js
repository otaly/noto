// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Note, Favorite, ChangeFavorite } = initSchema(schema);

export {
  User,
  Note,
  Favorite,
  ChangeFavorite
};
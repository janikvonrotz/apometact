import api_ai from './api_ai';
import mongodb from './mongodb';

let resolvers = {
  Query: Object.assign(api_ai.Query, mongodb.Query),
  RootMutation: Object.assign(api_ai.RootMutation, mongodb.RootMutation)
}
resolvers = Object.assign({}, api_ai, mongodb, resolvers);

export default resolvers;

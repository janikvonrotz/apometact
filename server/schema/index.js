import api_ai from './api_ai';
import mongodb from './mongodb';

const schema = `
scalar Date
${mongodb.type}
${api_ai.type}
type RootMutation {
  ${mongodb.mutation}
  ${api_ai.mutation}
}
type Query {
  deal(id: String): Deal,
  deals(limit: Int): [Deal],
  category(id: String): Category,
  categories(limit: Int): [Category],
  entity(id: String): Entity,
  entities: [Entity],
  users(limit: Int): [User]
}
schema {
  query: Query,
  mutation: RootMutation,
}
`;

export default [schema];

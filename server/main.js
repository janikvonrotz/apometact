import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';
import proxyMiddleware from 'http-proxy-middleware';
import seed from './seed';
import { inMemory, toS3 } from './upload';

seed();

const GRAPHQL_PORT = 4000;
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  allowUndefinedInResolve: false,
  printErrors: true,
});
var app = express();

app.post('/upload', toS3.single('file'), function (request, response) {
  response.send(request.file)
})

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.use('/graphql', bodyParser.json(), apolloExpress({ schema: executableSchema }));
app.listen(GRAPHQL_PORT);

console.log('The time is: ', new Date());

WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphiql`));
WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/upload`));

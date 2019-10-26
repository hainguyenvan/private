const fetch = require("node-fetch");
const { ApolloServer } = require("apollo-server-express");
const {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} = require("graphql-tools");
const { setContext } = require("apollo-link-context");
const { HttpLink } = require("apollo-link-http");

const Constant = require("../const/constant");

const { types, resolves } = require("./graphql-schema");

exports.graphqlServer = async app => {
  const createRemoteSchema = async uri => {
    const http = new HttpLink({ uri: uri, fetch });
    const link = setContext((req, previousContext) => ({
      headers: {
        xapikey:
          previousContext.graphqlContext === undefined ||
          previousContext.graphqlContext.xapikey === undefined
            ? ``
            : previousContext.graphqlContext.xapikey
      }
    })).concat(http);
    const schema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
      schema,
      link
    });
  };

  // remote graphql
  const executableNewsSchema = await createRemoteSchema(
    Constant.NEWS_GRAPHQL_API_URL
  );
  const executableAuthSchema = await createRemoteSchema(
    Constant.AUTH_GRAPHQL_API_URL
  );

  const finalSchema = mergeSchemas({
    schemas: [executableNewsSchema, executableAuthSchema].concat(types),
    resolvers: resolves
  });

  // GraphQL: Schema
  const apolloSever = new ApolloServer({
    schema: finalSchema,
    playground: {
      endpoint: `http://localhost:8080/graphql`
    },
    context: ({ req }) => ({
      xapikey: req.headers.xapikey
    })
  });

  apolloSever.applyMiddleware({
    app: app
  });
};

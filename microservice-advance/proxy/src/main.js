const Express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const { ApolloServer } = require("apollo-server-express");
const {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} = require("graphql-tools");
const { HttpLink } = require("apollo-link-http");

const NEWS_GRAPHQL_API_URL = "http://127.0.0.1:8001/graphql/news-service";
const AUTH_GRAPHQL_API_URL = "http://127.0.0.1:8000/graphql/auth-service";

const app = new Express();

async function run() {
  const createRemoteSchema = async uri => {
    const link = new HttpLink({ uri: uri, fetch });
    const schema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
      schema,
      link
    });
  };

  const executableNewsSchema = await createRemoteSchema(NEWS_GRAPHQL_API_URL);
  const executableAuthSchema = await createRemoteSchema(AUTH_GRAPHQL_API_URL);

  //   const hasuraWeatherResolvers = {
  //     person: {
  //       city_weather: {
  //         resolve(parent, args, context, info) {
  //           return info.mergeInfo.delegateToSchema({
  //             schema: executableWeatherSchema,
  //             operation: "query",
  //             fieldName: "cityWeather",
  //             args: {
  //               city_name: parent.city
  //             },
  //             context,
  //             info
  //           });
  //         }
  //       }
  //     }
  //   };

  //   //   extend author to have city_weather data
  //   const linkHasuraTypeDefs = `
  //       extend type PostType {
  //         city_weather:  name,
  //       }
  //     `;

  const finalSchema = mergeSchemas({
    schemas: [
      executableNewsSchema,
      executableAuthSchema
      //   linkHasuraTypeDefs
    ]
    // resolvers: hasuraWeatherResolvers
  });

  // GraphQL: Schema
  const apolloSever = new ApolloServer({
    // typeDefs: TYPEDEFS,
    // resolvers: RESOLVERS,
    schema: finalSchema,
    playground: {
      endpoint: `http://localhost:8080/graphql`,
      settings: {
        "editor.theme": "light"
      }
    }
  });

  apolloSever.applyMiddleware({
    app: app
  });

  app.listen(8080);
  console.log(
    "Server running. Open http://localhost:8080/graphql to run queries."
  );
} // end of async run

try {
  run();
} catch (e) {
  console.log(e);
}

const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require("lodash");

// get path folder of schemas
const ROOT_DIR = require('path').resolve(__dirname, '../server/schemas');

// index
const indexSchemaFile = ROOT_DIR + '/index.graphql';
const indexTypeDefs = fs.readFileSync(indexSchemaFile, { encoding: 'utf-8' });
const indexResolvers = require('./resolvers/index');

// account
const accountSchemaFile = ROOT_DIR + '/account.graphql';
const accountTypeDefs = fs.readFileSync(accountSchemaFile, { encoding: 'utf-8' });
const accountResolvers = require('./resolvers/account');

// post
const postSchemaFile = ROOT_DIR + '/post.graphql';
const postTypeDefs = fs.readFileSync(postSchemaFile, { encoding: 'utf-8' });
const postResolvers = require('./resolvers/post');

// role
const roleSchemaFile = ROOT_DIR + '/role.graphql';
const roleTypeDefs = fs.readFileSync(roleSchemaFile, { encoding: 'utf-8' });

// create type defs
const typeDefs = [
    indexTypeDefs,
    accountTypeDefs,
    postTypeDefs,
    roleTypeDefs,
];

// create resolvers
const resolves = merge(
    indexResolvers,
    accountResolvers,
    postResolvers,
);


const GrapQLSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolves,
    resolverValidationOptions: { requireResolversForResolveType: false }
});
module.exports = GrapQLSchema;
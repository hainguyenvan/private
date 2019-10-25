const fs = require('fs');
const { merge } = require('lodash');

const ROOT_DIR = require('path').resolve(__dirname, '../graphql');

/**
 * news service
 */
// post
const postSchemaFile = ROOT_DIR + '/news-service/post/types.graphql';
const postType = fs.readFileSync(postSchemaFile, { encoding: 'utf-8' });
const postResolvers = require('./news-service/post/resolver');

// types
exports.types = [postType];

// resolvers
exports.resolves = merge(postResolvers);
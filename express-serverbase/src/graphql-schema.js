const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require("lodash");

// get path folder of schemas
const ROOT_DIR = require('path').resolve(__dirname, '../src/schemas');

// index
const indexSchemaFile = ROOT_DIR + '/index.graphql';
const indexTypeDefs = fs.readFileSync(indexSchemaFile, { encoding: 'utf-8' });
const indexResolvers = require('./resolvers/index');

// user
const userSchemaFile = ROOT_DIR + '/user.graphql';
const userTypeDefs = fs.readFileSync(userSchemaFile, { encoding: 'utf-8' });
const userResolvers = require('./resolvers/user');

// category
const categorySchemaFile = ROOT_DIR + '/category.graphql';
const categoryTypeDefs = fs.readFileSync(categorySchemaFile, { encoding: 'utf-8' });
const categoryResolvers = require('./resolvers/category');

// agent
const agentSchemaFile = ROOT_DIR + '/agent.graphql';
const agentTypeDefs = fs.readFileSync(agentSchemaFile, { encoding: 'utf-8' });
const agentResolvers = require('./resolvers/agent');

// customer
const customerSchemaFile = ROOT_DIR + '/customer.graphql';
const customerTypeDefs = fs.readFileSync(customerSchemaFile, { encoding: 'utf-8' });
const customerResolvers = require('./resolvers/customer');

// location
const locationSchemaFile = ROOT_DIR + '/location.graphql';
const locationTypeDefs = fs.readFileSync(locationSchemaFile, { encoding: 'utf-8' });
const locationResolvers = require('./resolvers/location');

// device model
const deviceModelSchemaFile = ROOT_DIR + '/device-model.graphql';
const deviceModelTypeDefs = fs.readFileSync(deviceModelSchemaFile, { encoding: 'utf-8' });
const deviceModelResolvers = require('./resolvers/device-model');

// device
const deviceSchemaFile = ROOT_DIR + '/device.graphql';
const deviceTypeDefs = fs.readFileSync(deviceSchemaFile, { encoding: 'utf-8' });
const deviceResolvers = require('./resolvers/device');

// material
const materialSchemaFile = ROOT_DIR + '/material.graphql';
const materialTypeDefs = fs.readFileSync(materialSchemaFile, { encoding: 'utf-8' });
const materialResolvers = require('./resolvers/material');

// material io
const materialIOSchemaFile = ROOT_DIR + '/materialio.graphql';
const materialIOTypeDefs = fs.readFileSync(materialIOSchemaFile, { encoding: 'utf-8' });
const materialIOResolvers = require('./resolvers/materialio');

// material io group
const materialIOGrouopSchemaFile = ROOT_DIR + '/materialio-group.graphql';
const materialIOGroupTypeDefs = fs.readFileSync(materialIOGrouopSchemaFile, { encoding: 'utf-8' });
const materialIOGroupResolvers = require('./resolvers/materialio-group');

// handover detail
const handoverDetailSchemaFile = ROOT_DIR + '/handover-detail.graphql';
const handoverDetailTypeDefs = fs.readFileSync(handoverDetailSchemaFile, { encoding: 'utf-8' });
const handoverDetailResolvers = require('./resolvers/handover-detail');

// handover
const handoverSchemaFile = ROOT_DIR + '/handover.graphql';
const handoverTypeDefs = fs.readFileSync(handoverSchemaFile, { encoding: 'utf-8' });
const handoverResolvers = require('./resolvers/handover');

// repair detail
const repairDetailSchemaFile = ROOT_DIR + '/repair-detail.graphql';
const repairDetailTypeDefs = fs.readFileSync(repairDetailSchemaFile, { encoding: 'utf-8' });
const repairDetailResolvers = require('./resolvers/repair-detail');

// repair
const repairSchemaFile = ROOT_DIR + '/repair.graphql';
const repairTypeDefs = fs.readFileSync(repairSchemaFile, { encoding: 'utf-8' });
const repairResolvers = require('./resolvers/repair');

// notification
const notificationSchemaFile = ROOT_DIR + '/notification.graphql';
const notificationTypeDefs = fs.readFileSync(notificationSchemaFile, { encoding: 'utf-8' });
const notificationResolvers = require('./resolvers/notification');

// create type defs
const typeDefs = [
    indexTypeDefs,
    userTypeDefs,
    categoryTypeDefs,
    agentTypeDefs,
    customerTypeDefs,
    locationTypeDefs,
    deviceModelTypeDefs,
    deviceTypeDefs,
    materialTypeDefs,
    handoverDetailTypeDefs,
    repairDetailTypeDefs,
    repairTypeDefs,
    materialIOTypeDefs,
    materialIOGroupTypeDefs,
    notificationTypeDefs,
    handoverTypeDefs
];

// create resolvers
const resolves = merge(
    indexResolvers,
    userResolvers,
    categoryResolvers,
    agentResolvers,
    customerResolvers,
    locationResolvers,
    deviceModelResolvers,
    deviceResolvers,
    materialResolvers,
    handoverDetailResolvers,
    repairResolvers,
    repairDetailResolvers,
    materialIOResolvers,
    materialIOGroupResolvers,
    notificationResolvers,
    handoverResolvers
);


const GrapQLSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolves,
    resolverValidationOptions: { requireResolversForResolveType: false }
});
module.exports = GrapQLSchema;
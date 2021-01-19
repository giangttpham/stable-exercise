const { buildSchema } = require('graphql');
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const jsonData = require('./data.json');

//#region SETTING UP GRAPHQL SERVER

// Declare schema for the project
// This can be split into separate files using GraphQLObjectType
var schema = buildSchema(`
  type MailItem {
    id: String!
    businessRecipient: String
    forward: ActionDetails
    from: String!
    imageUrl: String!
    individualRecipient: String
    scan: ActionDetails
    shred: ActionDetails
    timestamp: Float!
  }

  type ActionDetails {
    status: Status!
  }

  enum Status {
    completed
    processing
  }

  type Query {
    getAllMailItems: [MailItem]!
  }
`);

var root = {
  // Return all mail items from the GraphQL server
  getAllMailItems: () => {
    return jsonData;
  },
};
//#endregion

//#region STARTING THE EXPRESS SERVER
const app = express();

// Allow cross-origin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//#endregion

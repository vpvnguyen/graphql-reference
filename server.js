const express = require("express");
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require("graphql");

const PORT = 5000;

const app = express();

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Single book by author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) }, // define type with graphql api
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: "Query", // namae the query
  description: "Root Query", // give a desc to the query
  fields: () => ({
    books: {
      type: new GraphQLList(BookType), // create a type
      description: "List of books",
      resolve: () => books
    }
  })
});

// Example database
const books = [
  { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
  { id: 2, name: "Harry Potter and the Prisoner of Alibaba", authorId: 1 },
  { id: 3, name: "Harry Potter and the Goblet of Stout", authorId: 1 },
  { id: 4, name: "LOTR: The Fellowship of the Ring", authorId: 2 },
  { id: 5, name: "LOTR: The Two Towers", authorId: 2 },
  { id: 5, name: "LOTR: The Return of the King", authorId: 2 }
];

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "J. R. R. Tolkien" }
];

const schema = new GraphQLSchema({
  query: RootQueryType
});

// pass in an object containing the schema and UI to graphql
// this gives access to graphql's interface to interact with the API
app.use(
  "/",
  expressGraphQL({
    schema: schema,
    // UI for graphql
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`GraphQL server is running on: ${PORT}`));

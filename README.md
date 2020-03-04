# graphql-reference

- A traditional method to call for data sometimes involve making several API calls to your server to query for more information that what is needed.
- GraphQL - Make a single API call to query for specfically needed information from your Node / Express server.

## Setup

- `npm install express express-graphql`
- Define schema of how all of data interacts together and pass into GraphQL.

```javascript
const express = require("express");
const expressGraphQL = require("express-graphql");

const PORT = 5000;

const app = express();

// get UI for graphql
app.use("/", expressGraphQL({ graphiql: true }));

app.listen(PORT, () => console.log(`GraphQL server is running on: ${PORT}`));
```

```javascript
{
    "errors": [ { "message": "GraphQL middleware options must contain a schema." } ]
}
```

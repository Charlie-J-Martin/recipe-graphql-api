import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const MONGODB =
  'mongodb+srv://admin:<password>@cluster0.qgsjjf6.mongodb.net/?retryWrites=true&w=majority';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('MongoDB Connection Successful');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

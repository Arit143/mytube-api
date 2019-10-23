import express from "express";
import path from "path";
import { mkdir } from 'fs';
import { ApolloServer } from "apollo-server-express";

import typeDefs from './typedefs';
import resolvers from './resolvers';

const start = (): void => {
  try {
    mkdir(path.join(__dirname, "../videos"), { recursive: true }, (err) => {
      if (err) {
        console.log(`Error creating directory: ${err}`);
        throw new Error('video upload directory cannot be created');
      }
    })
    
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    app.use("/videos", express.static(path.join(__dirname, "../videos")));

    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log(`🚀 Server ready at http://localhost:4000/`);
    });

  } catch (err) {
    console.log('app error occured');
    return err;
  }
}

start();

import express from "express";
import { ApolloServer } from "apollo-server-express";

import path from "path";
import { mkdir } from 'fs';
import { promisify } from 'util';
import bunyan from 'bunyan';

import typeDefs from './typedefs';
import resolvers from './resolvers';
import StreamController from './stream.controller';

const asyncMkDir = promisify(mkdir);
const logger = bunyan.createLogger({ name: 'app' });

const start = async (): Promise<void | Error> => {
  try {
    await asyncMkDir(path.join(__dirname, "../videos/thumbnails"), { recursive: true });

    logger.info('video and thumbnail folder created');

    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    /**
     * Serve static images for thumbnails
     */
    app.use("/videos/thumbnails", express.static(path.join(__dirname, "../videos/thumbnails")));
    /**
     * Controller to stream video content
     */
    app.get("/stream/:id", StreamController);

    /**
     * Express as a middleware for apollo server
     */
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      logger.info(`🚀 Server ready at http://localhost:4000/`);
    });

  } catch (err) {
    logger.error('app error occured', err);
    return err;
  }
}

start();

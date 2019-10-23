import { IResolvers } from 'graphql-tools';
import { ApolloError } from 'apollo-server-core';
import { createWriteStream } from 'fs';
import path from 'path';

const resolvers: IResolvers = {
    Query: {
      files: (): [] => []
    },
    Mutation: {
      uploadFile: async (parent, { file }) => {
        try {
          const { createReadStream, filename } = await file;
  
          const response = await new Promise((resolve, reject) =>
            createReadStream()
              .pipe(createWriteStream(path.join(__dirname, "../videos", filename)))
              .on("close", resolve)
              .on("error", reject)
          );
  
          console.log(response);
        } catch (err) {
          throw new ApolloError('unexpected error occured', err);
        }
      }
    }
  }

  export default resolvers;
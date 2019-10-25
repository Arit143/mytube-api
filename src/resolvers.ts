import { IResolvers } from 'graphql-tools';

import getFileDetails from './query/getFileDetails';
import uploadFile from './mutation/uploadFile';

const resolvers: IResolvers = {
  Query: {
    files: getFileDetails
  },
  Mutation: {
    uploadFile
  }
}

export default resolvers;
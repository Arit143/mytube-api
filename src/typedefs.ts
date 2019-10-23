import { gql } from "apollo-server-express";

const typeDefs = gql`
  """
  Query to get all the files that are uploaded
  """
  type Query {
    files: [String]
  }

  """
  Mutation to upload all files
  """
  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

export default typeDefs;
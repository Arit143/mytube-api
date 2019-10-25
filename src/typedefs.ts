import { gql } from "apollo-server-express";

const typeDefs = gql`
  """
  Get file details from uploaded file list
  """
  type FileDetails {
    fileName: String
    size: Int
    type: String
  }

  """
  Query to get all the files that are uploaded
  """
  type Query {
    files: [FileDetails]
  }

  """
  Mutation to upload all files
  """
  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

export default typeDefs;
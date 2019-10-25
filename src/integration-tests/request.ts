
import gql from "graphql-tag";
import { GraphQLClient } from "graphql-request";
import { print } from "graphql/language/printer";
import { Variables } from "graphql-request/dist/src/types";

const ENDPOINT = "http://localhost:4000/graphql";

function request<T = any>(
  query: ReturnType<typeof gql>,
  variables?: Variables,
): Promise<T> {
  const graphQLClient = new GraphQLClient(ENDPOINT);
  return graphQLClient.request(print(query), variables);
}

export default request;
import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER {
    user {
      id
      firstName
      events {
        id
        title
        description
        start
        end
      }
    }
  }
`;

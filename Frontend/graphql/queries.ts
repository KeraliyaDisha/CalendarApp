import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER {
    user {
      id
      firstName
      email
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

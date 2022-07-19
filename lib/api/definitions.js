import { gql } from '@apollo/client';
export const GET_SCRIPT = gql`
  query FetchScript($slug: String!) {
    script(slug: $slug) {
      title
      visibility
      runCount
      description
      slug
      id
      code
    }
  }
`;

export const CREATE_SCRIPT = gql`
  mutation CreateScript($input: createScriptInput!) {
    createScript(input: $input) {
      script {
        title
        slug
        code
        runCount
      }
      errors
    }
  }
`;

export const UPDATE_SCRIPT = gql`
  mutation UpdateScript($input: updateScriptInput!) {
    updateScript(input: $input) {
      script {
        title
        code
        runCount
      }
      errors
    }
  }
`;
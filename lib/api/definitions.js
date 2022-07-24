import { gql } from '@apollo/client';
export const GET_POPULAR_SCRIPTS = gql`
  query {
    popularScripts {
      title
      slug
      description
      visibility
    }
  }
`;
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

export const CREATE_ACCOUNT = gql`
  mutation SignUp($input: signUpUserInput!) {
    signUpUser(input: $input) {
      errors
      token
    }
  }
`;

export const LOGIN = gql`
  mutation SignIn($input: signInUserInput!) {
    signInUser(input: $input) {
      errors
      token
    }
  }
`;
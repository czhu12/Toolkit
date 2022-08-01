import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      id
      email
      username
    }
  }
`;

export const GET_SCRIPTS = gql`
  query FetchScripts($page: Int!, $q: String, $ownerId: Int) {
    scripts(page: $page, q: $q, ownerId: $ownerId) {
      scripts {
        title
        visibility
        runCount
        description
        slug
        id
        code
        user {
          username
        }
      }
      totalPages
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
      user {
        username
      }
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
import { gql, useQuery, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic'
const Editor = dynamic(import('../../lib/editor'), {ssr: false})

const GET_SCRIPT = gql`
  query {
    script(id: "Script-1") {
      title
      visibility
      runCount
      description
      id
      code
    }
  }
`;

const UPDATE_SCRIPT = gql`
  mutation UpdateScript($data: updateScriptInput!) {
    updateScript(input: $data) {
      script {
        title
        code
        runCount
      }
    }
  }
`;

function DisplayApplication() {
  const { loading, error, data } = useQuery(GET_SCRIPT);
  const [mutateFunction, { d, l, e }] = useMutation(UPDATE_SCRIPT);
  const saveScript = (attributes) => {
    mutateFunction({
      data: {
        attributes: attributes
      }
    });
  }

  return <div>
    {
      typeof window !== "undefined" &&
      data?.script?.code &&
      <Editor initialCode={data.script.code} saveScript={saveScript} />
    }
  </div>
}

export default DisplayApplication
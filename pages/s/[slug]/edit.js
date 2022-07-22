import { useQuery, useMutation } from '@apollo/client';
import App from "../../../lib/components/editor/app";
import {GET_SCRIPT, UPDATE_SCRIPT} from '../../../lib/api/definitions';
import { useRouter } from 'next/router';

function EditScript() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_SCRIPT, {
    variables: {
      slug: router.query.slug,
    }
  });
  const [mutateFunction, { d, l, e }] = useMutation(UPDATE_SCRIPT);
  const saveScript = (script) => {
    mutateFunction({
      variables: {
        input: {
          id: script.id,
          attributes: {
            title: script.title,
            visibility: script.visibility,
            slug: script.slug,
            code: script.code,
            description: script.description,
          },
        }
      }
    });
  }

  return <div>
    {
      typeof window !== "undefined" &&
      data?.script &&
      <App initialScript={data.script} saveScript={saveScript} />
    }
  </div>
}

export default EditScript
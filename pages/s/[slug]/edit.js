import { useQuery, useMutation } from '@apollo/client';
import App from "../../../lib/components/editor/app";
import {GET_SCRIPT, UPDATE_SCRIPT} from '../../../lib/api/definitions';
import { useRouter } from 'next/router';
import NavbarLogo from '../../../lib/components/common/navigation/NavbarLogo';
import { Navbar } from '../../../lib/components/common/navigation/Navbar';


function EditScript() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_SCRIPT, {
    variables: {
      slug: router.query.slug,
    }
  });
  const [mutateFunction, { d, l, e }] = useMutation(UPDATE_SCRIPT);
  const saveScript = async (script) => {
    return await mutateFunction({
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
    <style>{`
      body {
        margin: 0;
        height: 100%;
        overflow: hidden !important;
      }
    `}</style>
    {
      typeof window !== "undefined" &&
      data?.script &&
      <div id="editor">
        <Navbar container={false} dark={true} />
        <App
          initialScript={data.script}
          saveScript={saveScript}
        />
      </div>
    }
  </div>
}

export default EditScript
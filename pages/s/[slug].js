import { useQuery, useMutation } from '@apollo/client';
import App from "../../lib/editor/app"
import { GET_SCRIPT } from '../../lib/api/definitions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function RunScript() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_SCRIPT, {
    variables: {
      slug: router.query.slug,
    }
  });
  useEffect(() => {
    if (data?.script) {
      window.__bs_run(data.script.code);
    }
  }, [loading]);

  return <div>
    {
      typeof window !== "undefined" &&
      data?.script &&
      <div id="main-view">
      </div>
    }
  </div>
}

export default RunScript
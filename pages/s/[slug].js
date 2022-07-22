import { useQuery } from '@apollo/client';
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
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item">
            Home
          </a>
        </div>
      </div>
    </nav>
    {
      typeof window !== "undefined" &&
      data?.script &&
      <div>
        <div className="container">
          <div id="main-view">
          </div>
        </div>
      </div>
    }
  </div>
}

export default RunScript
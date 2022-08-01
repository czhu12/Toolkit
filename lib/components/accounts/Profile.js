import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_SCRIPT, GET_SCRIPTS, CURRENT_USER } from "../../api/definitions";
import ScriptCard from "../common/scripts/ScriptCard";

function Profile() {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const [scripts, setScripts] = useState([]);
  const client = useApolloClient();
  useEffect(() => {
    if (data?.me) {
      fetchScripts();
    }
  }, [data]);

  const fetchScripts = async () => {
    const result = await client.query({query: GET_SCRIPTS, variables: {ownerId: data.me.id, page: 1}});
    setScripts(result.data.scripts);
  }

  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const createScript = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          attributes: {
            title: "Untitled",
            visibility: "public",
            code: "",
            description: "",
          },
        }
      }
    });
    if (!result.data.createScript.errors) {
      window.location.href = `/s/${result.data.createScript.script.slug}?first=1&created=true`;
    }
  }

  return (
    <div>
      <section className="section">
        <button className="button" onClick={createScript}>Create App</button>
        <div className="title">{data?.me?.username}</div>
      </section>
      <section className="section">
        <div className="container">
          {scripts?.scripts?.map(script => <ScriptCard script={script} />)}
        </div>
      </section>
    </div>
  )
}

export default Profile;

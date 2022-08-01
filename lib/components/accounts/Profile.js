import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_SCRIPT, GET_SCRIPTS, CURRENT_USER } from "../../api/definitions";
import DisplayScripts from "../common/scripts/DisplayScripts";
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
      window.location.href = `/s/${result.data.createScript.script.slug}/edit`;
    }
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="title">{data?.me?.username}</div>
        </div>
        <div className="column has-text-right">
          <button className="button is-black" onClick={createScript}>
            <span className="icon">
              <i className="fa-solid fa-plus"></i>
            </span>

            <span>
              Create App
            </span>
          </button>
        </div>
      </div>
      <DisplayScripts scripts={scripts?.scripts || []} n={4} />
    </div>
  )
}

export default Profile;

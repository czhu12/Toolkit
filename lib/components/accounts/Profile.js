import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_SCRIPT, GET_SCRIPTS, CURRENT_USER } from "../../api/definitions";
import DisplayScripts from "../common/scripts/DisplayScripts";
import { useAuth } from "./utils";

function Profile() {
  const { currentUser } = useAuth();
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();
  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    setLoading(true);
    const result = await client.query({query: GET_SCRIPTS, variables: {ownerId: currentUser.id, page: 1}});
    setScripts(result.data.scripts);
    setLoading(false);
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
    <div className="container mt-5">
      <div className="columns">
        <div className="column">
          <div className="title">Your Apps</div>
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
      <DisplayScripts loading={loading} scripts={scripts?.scripts || []} n={4}>
        <div className="has-text-centered">
          <img src="/images/empty-screen.png" style={{width: "300px"}} />
          <div className="subtitle is-4">
            Create Your First App
          </div>
          <button className="button is-danger is-large" style={{width: "400px"}} onClick={createScript}>
            <span className="icon">
              <i className="fa-solid fa-plus"></i>
            </span>

            <span>
              Create App
            </span>
          </button>
        </div>
      </DisplayScripts>
    </div>
  )
}

export default Profile;

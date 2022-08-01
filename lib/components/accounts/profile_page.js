import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { authenticatedClient } from "../../../apollo-client";
import { CREATE_SCRIPT, GET_USER_SCRIPTS } from "../../api/definitions";
import ScriptCard from "../common/scripts/ScriptCard";

function ProfilePage() {
  const [userScripts, setUserScripts] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await authenticatedClient.query({
          query: GET_USER_SCRIPTS,
        });
        setUserScripts(response.data.userScripts);
      } catch {
        window.location.href = "/accounts/login"
      }
    }
    getUser();
  },[])

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
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <figure className="image is-24x24">
                <img src="/logos/tooltip-purple.png" />
              </figure>
              <div className="has-text-weight-bold is-size-5 has-color-purple ml-3">Tooltip</div>
            </a>
          </div>
        </div>
      </nav>
      <section className="section">
        <button className="button" onClick={createScript}>Create App</button>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="is-size-1">{userScripts[0]?.user?.username}</h1>
          <div className="container">
            {userScripts.map(script => <div className="my-3"><ScriptCard script={script}/></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage;
import React, { useEffect, useState } from "react";
import GalleryCard from "../../lib/components/gallery/gallery_card";
import { GET_USER_SCRIPTS } from '../../lib/api/definitions';
import Head from 'next/head';
import { authenticatedClient } from '../../apollo-client';

function IndexPage() {
  const [userScripts, setUserScripts] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      console.log(window.localStorage.getItem('token'))
      const response = await authenticatedClient.query({
        query: GET_USER_SCRIPTS,
      });
      setUserScripts(response.data.userScripts);
    }
    getUser();
  },[])


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
        <div className="container">
          <h1 className="is-size-1">Username</h1>
          <div className="container">
            {userScripts.map(script => <GalleryCard {...script} />)}
          </div>
        </div>
      </section>
    </div>
  )
}

export default IndexPage;
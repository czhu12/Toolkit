import { useApolloClient, useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_SCRIPTS } from "../lib/api/definitions";
import { AuthProvider } from "../lib/components/accounts/utils";
import { Navbar } from "../lib/components/common/navigation/Navbar";
import NavbarLogo from "../lib/components/common/navigation/NavbarLogo";
import Pagination from "../lib/components/common/Pagination";
import DisplayScripts from "../lib/components/common/scripts/DisplayScripts";

function randomSearchQuery() {
  const queries = [
    `"png to jpeg"`,
    `"meme generator"`,
    `"bionic reading converter"`,
    `"movie suggestions"`,
  ];
  return queries[Math.floor(Math.random() * queries.length)];
}


function BrowsePage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams;
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const client = useApolloClient();

  const performSearch = async (q, p) => {
    setLoading(true);
    const data = await client.query({
      query: GET_SCRIPTS,
      variables: {
        page: p,
        q: q ? q : null
      },
    });
    setData(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    performSearch(search, page);
  }, [search, page]);

  return (
    <div>
      <Head>
        <title>Browse Popular Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider lazy={false}>
        <Navbar />
        <div className="container section">
          <div className="my-5 is-size-1 is-size-3-mobile has-text-weight-bold">
            Search Apps
          </div>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-medium"
              type="text"
              placeholder={randomSearchQuery()}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <span className="icon is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="my-5">
            {loading && (
              <div className="has-text-centered">
                <ClipLoader size={75} color="#b5b5b5" />
              </div>
            )}
            {data?.scripts?.scripts && (
              <div>
                <DisplayScripts scripts={data.scripts.scripts} n={3} />
                <div className="mt-5">
                  {data?.scripts?.scripts.length >= 0 && (
                    <Pagination currentPage={page} totalPages={data.scripts.totalPages} onClick={(newPage) => {
                      setPage(newPage);
                    }} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default BrowsePage;
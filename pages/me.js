import React from "react";
import Profile from "../lib/components/accounts/Profile";
import { withDefaultHeaders } from "../lib/components/common/headers";
import { Navbar } from "../lib/components/common/navigation/Navbar";

function MePage() {
  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  )
}

export default withDefaultHeaders(MePage);
import React from "react";
import Profile from "../lib/components/accounts/Profile";
import { AuthProvider } from "../lib/components/accounts/utils";
import { withDefaultHeaders } from "../lib/components/common/headers";
import { Navbar } from "../lib/components/common/navigation/Navbar";

function MePage() {
  return (
    <div>
      <AuthProvider lazy={true}>
        <Navbar />
        <Profile />
      </AuthProvider>
    </div>
  )
}

export default withDefaultHeaders(MePage);
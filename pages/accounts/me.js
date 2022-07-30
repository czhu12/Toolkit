import React from "react";
import ProfilePage from "../../lib/components/accounts/profile_page";
import { withDefaultHeaders } from "../../lib/components/common/headers";

function IndexPage() {
  return (
    <ProfilePage />
  )
}

export default withDefaultHeaders(IndexPage);
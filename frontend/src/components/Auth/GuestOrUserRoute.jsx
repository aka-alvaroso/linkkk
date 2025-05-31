import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/Auth";
import Loading from "../Common/Loading";

function GuestOrUserRoute({ children }) {
  const { isGuestSession, authLoading, isLoggedIn } = useAuth();

  if (authLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isLoggedIn && !isGuestSession) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default GuestOrUserRoute;

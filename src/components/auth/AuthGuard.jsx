import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { setUser } from "../../lib/redux/slice/user.slice";
import { useProfileQuery } from "../../lib/redux/services/auth/auth.service";

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const {
    data: profileData,
    isLoading,
    isError,
  } = useProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (profileData) {
      dispatch(setUser(profileData));
    }
  }, [profileData, dispatch]);
  // const profile = { name: "sumon" };
  // dispatch(setUser(profile));
  if (token) {
    return children;
  } else return <Navigate to="/login" replace />;
};

export default AuthGuard;

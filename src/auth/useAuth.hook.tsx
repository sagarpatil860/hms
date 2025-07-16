/* eslint-disable jsdoc/require-jsdoc */

import { useContext } from "react";

import { AuthContext } from "./Auth.context";

function useAuth() {
  const ctx = useContext(AuthContext);

  return ctx;
}

export default useAuth;

import React, { type JSX } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import useAuth from "@auth/useAuth.hook";
import { ROUTE_CONFIG } from "@routing/routes.config";

/**
 * Routing logic is written here
 *
 * @returns {JSX.Element} Routing logic
 */
function RouterCore(): JSX.Element {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  return (
    <Routes>
      {ROUTE_CONFIG.map(
        ({ path, component: Component, isProtected, roles, props }) => {
          const requestedPath = location.pathname;

          // ❌ Auth check
          if (isProtected && !isAuthenticated) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Navigate
                    to="/login"
                    replace
                    state={{ from: requestedPath }}
                  />
                }
              />
            );
          }

          // ⛔ Role check
          if (isProtected && roles && (!user || !roles.includes(user.role))) {
            return (
              <Route
                key={path}
                path={path}
                element={<Navigate to="/unauthorized" replace />}
              />
            );
          }

          // ✅ Allow route
          return (
            <Route key={path} path={path} element={<Component {...props} />} />
          );
        },
      )}
    </Routes>
  );
}

export default RouterCore;

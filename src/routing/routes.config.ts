import { ROLE } from "@constants/auth.constants";
import { ROUTE_PATHS } from "@constants/routing.constants";
import Dashboard from "@pages/dashboard/Dashboard.page";
import Login from "@pages/login/Login.page";
import NotFound from "@pages/notFound/NotFound.page";

import type { RouteItem } from "@shared-types/routing.types";

export const ROUTE_CONFIG: RouteItem[] = [
  { path: ROUTE_PATHS.LOGIN, component: Login, isProtected: false },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: Dashboard,
    isProtected: true,
    roles: [ROLE.ADMIN, ROLE.DOCTOR, ROLE.RECEPTIONIST],
  },
  { path: ROUTE_PATHS.NOT_FOUND, component: NotFound, isProtected: false },
];

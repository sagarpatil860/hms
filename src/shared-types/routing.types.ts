import type { ComponentClass, FunctionComponent } from "react";

// ROUTE_PATHS is the Object in which all app level routes are defined
import type { ROUTE_PATHS } from "@constants/routing.constants";
import type { RoleValue } from "@shared-types/auth.types";

export type RouteKey = keyof typeof ROUTE_PATHS;
/**
 * RoutePathValue defines a union type from the values of the ROLE object — which TypeScript will infer as
 * type RoutePathValue =
 | "/login" 
 | "/dashboard" 
 | "/patients" 
 | "/billing" 
 | "/pharmacy" 
 | "/lab-reports" 
 | "/emergency" 
 | "/unauthorized" 
 | "*"
 */
export type RoutePathValue = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

export interface RouteItem {
  path: RoutePathValue;
  component: FunctionComponent | ComponentClass;
  isProtected: boolean;
  roles?: RoleValue[];
  props?: Record<string, unknown>;
}

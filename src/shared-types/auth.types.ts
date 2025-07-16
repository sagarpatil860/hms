/**
 * Role is an object with following values
 * export const ROLE = {
 * ADMIN: "admin",
 * DOCTOR: "doctor",
 * RECEPTIONIST: "receptionist",
 * PHARMACIST: "pharmacist",
 * LAB_TECHNICIAN: "lab-technician",
 * EMERGENCY_STAFF: "emergency-staff",
};
 */
import type { ROLE } from "@constants/auth.constants";

export type RoleKey = keyof typeof ROLE;
/**
 * RoleValue defines a union type from the values of the ROLE object — which TypeScript will infer as
 * type RoleValue =
  | "admin"
  | "doctor"
  | "receptionist"
  | "pharmacist"
  | "lab-technician"
  | "emergency-staff";
 */
export type RoleValue = (typeof ROLE)[keyof typeof ROLE];

export interface User {
  userName: string;
  role: RoleValue;
}
// { userName: "sagar", password: "123", role: "admin" },
export interface UserCredentials extends User {
  password: string;
}
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { userName: string; password: string }) => Promise<boolean>;
}

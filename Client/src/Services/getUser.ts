import type { UserNamespace } from "../Types/User";

export function getUser(): UserNamespace.User {
  const userData = localStorage.getItem("userData");

  return userData
    ? JSON.parse(userData)
    : {
        id: -1,
        name: "",
        email: "",
      };
}
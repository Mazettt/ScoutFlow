import React from "react";
import { useCurrentUser } from "../Contexts/CurrentUser";

const getChildren = (children, displayName) =>
  React.Children.map(children, (child) => (child.type.displayName === displayName ? child : null));

function RoleAccess({ children, allOf = [], anyOf = [] }) {
  const currentUser = useCurrentUser();

  let authorizedChildren = getChildren(children, "Authorized");
  let unauthorizedChildren = getChildren(children, "Unauthorized");

  if (allOf.length > 0 && anyOf.length > 0) {
    throw new Error("You can't use both allOf and anyOf at the same time");
  }

  if (authorizedChildren.length === 0) {
    authorizedChildren = children;
    if (unauthorizedChildren.length > 0) {
      throw new Error(
        "You must provide an Authorized component if you provide an Unauthorized component"
      );
    }
  }

  if (allOf.length > 0) {
    return (
      <>
        {(allOf.every((claim) => currentUser.customClaims[claim]) && authorizedChildren) ||
          unauthorizedChildren}
      </>
    );
  } else if (anyOf.length > 0) {
    return (
      <>
        {(anyOf.some((claim) => currentUser.customClaims[claim]) && authorizedChildren) ||
          unauthorizedChildren}
      </>
    );
  }
}

function Authorized({ children }) {
  return <>{children}</>;
}
Authorized.displayName = "Authorized";
RoleAccess.Authorized = Authorized;

function Unauthorized({ children }) {
  return <>{children}</>;
}
Unauthorized.displayName = "Unauthorized";
RoleAccess.Unauthorized = Unauthorized;

export default RoleAccess;

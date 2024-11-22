import React from "react";
import { useCurrentUser } from "../../Contexts/CurrentUser";
import { Typography } from "antd";
import RoleAccess from "../../Components/RoleAccess";

export default function Accueil() {
  const currentUser = useCurrentUser();
  return (
    <>
      <Typography.Title level={3}>Hello, {currentUser.displayName} Test</Typography.Title>
      <RoleAccess anyOf={["Admin"]}>
        <Typography.Text>Only admin content</Typography.Text>
      </RoleAccess>
    </>
  );
}
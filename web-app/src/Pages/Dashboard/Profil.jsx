import React from "react";
import { useCurrentUser } from "../../Contexts/CurrentUser";
import { Typography } from "antd";

export default function Profil () {
  const currentUser = useCurrentUser();
  return (
    <>
      <Typography.Paragraph>
        Votre mail est {currentUser.email}
      </Typography.Paragraph>
    </>
  );
  
}

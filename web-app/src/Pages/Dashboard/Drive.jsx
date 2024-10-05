import React from "react";
import { useCurrentUser } from "../../Contexts/CurrentUser";
import { Button, Dropdown, Flex, Image, Layout, Menu, Spin, theme, Typography } from "antd";

export default function Profil (bgtest) {
  console.log(bgtest);
  const currentUser = useCurrentUser();
  const changeBgColor = function (){
    bgtest = "#ffffff";
    console.log(bgtest);
  };
  return (
    <>
      <Typography.Paragraph>
        Bienvenue {currentUser.displayName}
      </Typography.Paragraph>
      <Button style={{width:"300px"}} onClick={changeBgColor}></Button>
    </>
  );
  
}
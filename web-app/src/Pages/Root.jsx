import { Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        <Space direction='horizontal'>
          <Link to='/login'>Se connecter</Link>
          <Link to='/register'>Créer un compte</Link>
        </Space>
      </div>
    </>
  );
}

import { Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <Space direction="vertical">
      <div>Home</div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </Space>
  );
}

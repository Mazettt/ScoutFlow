import React from "react";
import { useRouteError } from "react-router-dom";
import { Flex, Typography } from "antd";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex vertical={true} align="center" justify="center" gap={10} style={{ height: '100vh' }}>
      <Typography.Title>Oops!</Typography.Title>
      <Typography.Text>
        Sorry, an unexpected error has occurred.
      </Typography.Text>
      <Typography.Text italic type="danger">
        {error.statusText || error.message}
      </Typography.Text>
    </Flex>
  );
}

import React from "react";
import { ConfigProvider } from "antd";
import RouterProvider from "./Routes";
import { FirebaseProvider } from "./Contexts/Firebase";
import { APIProvider } from "./Contexts/API";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextSecondary: "#ffffff",
        },
        components: {
          Typography: {
            colorTextSecondary: "#ffffff",
          },
        },
      }}
    >
      <FirebaseProvider>
        <APIProvider>
          <RouterProvider />
        </APIProvider>
      </FirebaseProvider>
    </ConfigProvider>
  );
}

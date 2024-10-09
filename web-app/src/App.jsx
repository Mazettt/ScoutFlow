import React from "react";
import { ConfigProvider } from "antd";
import RouterProvider from "./Routes";
import { FirebaseProvider } from "./Contexts/Firebase";
import { APIProvider } from "./Contexts/API";

const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export var BgVar = "#ee7f00";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: BgVar,
          colorTextSecondary: "#ffffff",
        },
        components: {
          Calendar:{
            itemActiveBg: newShade(BgVar, +150),
          },
          Menu: {
            darkItemHoverBg: newShade(BgVar, -30),
            darkItemSelectedBg: newShade(BgVar, -40),
            darkItemBg: BgVar,
          },
          Layout: {
            siderBg: BgVar,
            triggerBg: newShade(BgVar, -40),
          },
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

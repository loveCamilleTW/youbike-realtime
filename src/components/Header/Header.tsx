import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Icon from "@mui/material/Icon";

import YOUBIKE_LOGO from "../../assets/logo.svg";

export function Header() {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navItems = ["使用說明", "收費方式", "站點資訊", "最新消息", "活動專區"];

  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "4.5rem",
          paddingX: "2rem",
          paddingBottom: "0",
        }}
      >
        <Box
          sx={{
            width: "4.0625rem",
            height: "4.0625rem",
            padding: "auto",
          }}
        >
          <Icon
            sx={{
              display: "block",
              width: "100%",
              margin: "auto",
            }}
          >
            <img src={YOUBIKE_LOGO} />
          </Icon>
        </Box>
        <Hamburger
          size={24}
          toggled={isDrawerOpened}
          toggle={setIsDrawerOpened}
        />
      </AppBar>
      <Drawer
        anchor="bottom"
        open={isDrawerOpened}
        variant="persistent"
        onClose={() => setIsDrawerOpened(false)}
        sx={{
          height: "100px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {navItems.map((navItems) => (
            <Box key={navItems}>{navItems}</Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

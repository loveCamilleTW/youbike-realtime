import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AppBar, Box, Drawer, Icon, Button } from "@mui/material";

import YOUBIKE_LOGO from "../../assets/logo.svg";

export function Header() {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "4.5rem",
          paddingX: "2rem",
          paddingBottom: "0",
          borderBottom: "1px solid #EBEBEB",
        }}
      >
        <Box
          sx={{
            width: "4.0625rem",
            height: "4.0625rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            sx={{
              width: "100%",
            }}
          >
            <img src={YOUBIKE_LOGO} />
          </Icon>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Hamburger
            size={24}
            toggled={isDrawerOpened}
            toggle={setIsDrawerOpened}
          />
        </Box>
      </AppBar>
      <NavigationDrawer
        isOpened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
      />
    </>
  );
}

interface NavigationDrawerProps {
  isOpened: boolean;
  onClose: () => void;
}

function NavigationDrawer(props: NavigationDrawerProps) {
  const { isOpened, onClose } = props;
  const navItems = ["使用說明", "收費方式", "站點資訊", "最新消息", "活動專區"];

  return (
    <Drawer
      anchor="bottom"
      open={isOpened}
      variant="persistent"
      onClose={onClose}
      sx={{}}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 4.5rem)",
          justifyContent: "space-between",
          padding: "2rem",
          backgroundColor: "secondary.main",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {navItems.map((navItems) => (
              <Box
                key={navItems}
                sx={{
                  flexGrow: "1",
                  backgroundColor: "inherit",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "secondary.contrastText",
                }}
              >
                {navItems}
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            disableElevation={true}
            sx={{
              width: "81px",
              height: "40px",
              borderRadius: "100px",
            }}
          >
            登入
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

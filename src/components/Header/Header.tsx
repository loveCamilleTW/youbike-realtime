import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AppBar, Box, Drawer, Icon, Button } from "@mui/material";

import { useWindowDimensions } from "@hooks/useWindowDimensions";
import YOUBIKE_LOGO from "@assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { MOBILE_THRESHOLD } from "../../constants/responsive";

const navItems = [
  {
    label: "使用說明",
    url: "usage",
  },
  {
    label: "收費方式",
    url: "charge",
  },
  {
    label: "站點資訊",
    url: "info",
  },
  {
    label: "最新消息",
    url: "news",
  },
  {
    label: "活動專區",
    url: "activity",
  },
];

export function Header() {
  const { width } = useWindowDimensions();

  return width > MOBILE_THRESHOLD ? <DesktopHeader /> : <MobileHeader />;
}

function DesktopHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = location.pathname.split("/")[2];

  return (
    <AppBar
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "6.5rem",
        paddingX: "124px",
        paddingBottom: "0",
        borderBottom: "1px solid #EBEBEB",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <Box
          sx={{
            width: "95px",
            height: "95px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={YOUBIKE_LOGO} />
          </Icon>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {navItems.map((navItem) => {
            const color =
              currentLocation === navItem.url ? "#677510" : "#B5CC22";
            return (
              <Box
                onClick={() => {
                  navigate(`/youbike-realtime/${navItem.url}`);
                }}
                key={navItem.label}
                sx={{
                  flexGrow: "1",
                  backgroundColor: "inherit",
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  color,
                  ":hover": {
                    color: "#677510",
                    cursor: "pointer",
                  },
                }}
              >
                {navItem.label}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
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
    </AppBar>
  );
}

function MobileHeader() {
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

  const navigate = useNavigate();

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
            {navItems.map((navItem) => (
              <Box
                onClick={() => {
                  navigate(`/youbike-realtime/${navItem.url}`);
                  onClose();
                }}
                key={navItem.label}
                sx={{
                  flexGrow: "1",
                  backgroundColor: "inherit",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "secondary.contrastText",
                  ":hover": {
                    color: "secondary.dark",
                  },
                }}
              >
                {navItem.label}
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

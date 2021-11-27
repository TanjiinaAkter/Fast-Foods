import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Grow,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import appContext from "../../context/context";
import useAuth from "../../hooks/useAuth";
import Container from "../Common/Container";
import Brand from "./Brand";
import Navbar from "./Navbar";
import User from "./User";

function Header() {
  const { user } = useAuth();
  const {
    state: {
      admin: { isLoggedIn },
    },
  } = useContext(appContext);
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <Brand />

      <Box
        bgcolor="var(--primary)"
        position="sticky"
        top="0"
        width="100%"
        zIndex="999"
      >
        <Container>
          {isSM && (
            <Box
              display="flex"
              justifyContent="space-between"
              color="var(--white)"
              alignItems="center"
            >
              {user.email || isLoggedIn ? (
                <User isAvatar />
              ) : (
                <Typography variant="h5">Fast Food</Typography>
              )}

              <IconButton color="inherit" onClick={handleToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          <Grow
            direction="down"
            in={isSM ? open : true}
            mountOnEnter
            unmountOnExit
          >
            <Box>
              <Navbar />
            </Box>
          </Grow>
        </Container>
      </Box>
    </>
  );
}
export default Header;

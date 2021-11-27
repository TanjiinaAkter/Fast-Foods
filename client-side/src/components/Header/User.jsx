import { Box, CardActionArea, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import appContext from "../../context/context";
import useAuth from "../../hooks/useAuth";
import AuthButton from "./AuthButton";
import Menu from "./Menu";

export default function ImageAvatars({ isAvatar }) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const {
    state: {
      admin: { isLoggedIn, name },
    },
    adminLogout,
  } = useContext(appContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickUserLogin = () => {
    if (user.email) {
      logout(history);
    } else {
      history.push("/user/login");
    }
  };
  const handleClickAdminLogin = () => {
    adminLogout(history);
  };

  const UserAvaterView = (
    <Box
      border="1px solid var(--secondary)"
      borderRadius="1rem"
      overflow="hidden"
      ml={isAvatar ? "0rem" : "1rem"}
    >
      <Menu
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
        anchorEl={anchorEl}
      />
      <CardActionArea
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          display="flex"
          flexDirection={isAvatar ? "row-reverse" : "row"}
          alignItems="center"
          p="0.5rem"
          borderRadius="1rem"
        >
          <Typography color="white" px="0.5rem">
            {user.displayName || name}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Avatar alt={user.displayName || name} src={user.photoURL} />
          </Stack>
        </Box>
      </CardActionArea>
    </Box>
  );
  return (
    <Box p="0.5rem" display="flex" alignItems="center">
      {!isAvatar && (
        <>
          {!isLoggedIn && (
            <AuthButton
              isLoggedIn={user.email ? true : false}
              handleClick={handleClickUserLogin}
            />
          )}

          {!user.email && (
            <AuthButton
              isLoggedIn={isLoggedIn}
              isAdmin
              handleClick={handleClickAdminLogin}
            />
          )}
        </>
      )}

      {isLoggedIn && UserAvaterView}
      {user.email && UserAvaterView}
    </Box>
  );
}

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      color="var(--white)"
    >
      <Button
        startIcon={<AccountCircleIcon />}
        onClick={() => handleClick("/user/profile")}
        color="inherit"
      >
        Profile
      </Button>
      <Button
        startIcon={<ShoppingBagIcon />}
        onClick={() => handleClick("/user/orders")}
        color="inherit"
      >
        My Orders
      </Button>
      <Button
        startIcon={<LogoutIcon />}
        onClick={() => handleClick("/")}
        color="inherit"
      >
        Logout
      </Button>
      <Typography>Demo User</Typography>
    </Box>
  );
}
export default Navbar;

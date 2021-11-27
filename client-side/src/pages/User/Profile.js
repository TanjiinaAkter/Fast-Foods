import { Home as HomeIcon } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import Container from "../../components/Common/Container";
import Item from "../../components/Profile/Item";
import Profile from "../../components/Profile/Profile";
import useAuth from "../../hooks/useAuth";
const iconStyle = { color: "inherit", fontSize: "inherit" };

function UserProfilePage() {
  const { logout } = useAuth();
  const history = useHistory();
  return (
    <Box py="4rem">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Profile />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" pb="1rem" color="text.secondary">
              Welcome Back!
            </Typography>
            <Divider />
            <br />
            <br />
            <Grid container spacing={2}>
              <Item
                name="Home"
                icon={<HomeIcon style={iconStyle} />}
                path="/"
              />
              <Item
                name="Order Foods"
                icon={<StorefrontIcon style={iconStyle} />}
                path="/foods"
              />
              <Item
                name="My Orders"
                icon={<ShoppingBasketIcon style={iconStyle} />}
                path="/user/orders"
              />
              <Item
                name="All Orders"
                icon={<FormatListBulletedIcon style={iconStyle} />}
                path="/all/orders"
              />
              <Item
                name="Logout"
                handleClick={() => logout(history)}
                icon={<LogoutIcon style={iconStyle} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default UserProfilePage;

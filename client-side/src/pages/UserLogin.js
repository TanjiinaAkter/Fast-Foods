import { Google as GoogleIcon } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "../components/Common/Container";
import useAuth from "../hooks/useAuth";

const UserLogin = () => {
  const { signInUsingGoogle, user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (user.email) {
      history.push(location?.state?.from?.pathname || "/user/profile");
    } else {
      if (localStorage.getItem("admin-auth-token")) {
        history.push(location?.state?.from?.pathname || "/");
      }
    }
  }, [user, history]);
  return (
    <Container>
      <Box maxWidth="700px" m="auto" p="1rem" my="4rem" boxShadow={2}>
        <Typography variant="h4" color="var(--primary)">
          Login
        </Typography>
        <Box pt="1rem" pb="2rem">
          <Divider />
        </Box>
        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          color="inherit"
          fullWidth
          onClick={() => signInUsingGoogle(history, location)}
        >
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default UserLogin;

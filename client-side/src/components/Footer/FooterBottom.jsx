import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SocialLinks from "./SocialLinks";

const FooterBottom = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      py="0.5rem"
      display={isMD ? "block" : "flex"}
      justifyContent="space-between"
      borderTop="1px solid var(--neutral)"
      alignItems="center"
      textAlign="center"
    >
      <SocialLinks />

      <Typography color="var(--white)" variant="h6">
        Developer By Tanjina Akter
      </Typography>
    </Box>
  );
};
export default FooterBottom;

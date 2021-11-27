import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const SocialLinks = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      display={isMD ? "block" : "flex"}
      textAlign="center"
      alignItems="center"
    >
      <Typography color="var(--white)" variant="h6">
        Follow US US
      </Typography>

      <Box display="flex" justifyContent="space-between" color="var(--white)">
        <IconButton
          size="large"
          color="inherit"
          href="https://facebook.com"
          target="_blank"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          href="https://youtube.com"
          target="_blank"
        >
          <YouTubeIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          href="https://twitter.com"
          target="_blank"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          href="https://instagram.com"
          target="_blank"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default SocialLinks;

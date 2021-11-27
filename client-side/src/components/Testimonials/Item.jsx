import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Ratings from "../Common/Ratings";

function ImageAvatars({ name, src }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={name} src={src} sx={{ width: 80, height: 80 }} />
    </Stack>
  );
}

const Item = ({ name, title, description, img, ratings }) => {
  return (
    <Grid item md={4}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <ImageAvatars src={img} name={name} />

        <Typography variant="h5" py="0.5rem" color="var(--secondary)">
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>

        <Ratings ratings={ratings} />

        <Typography py="0.15rem" variant="h6" color="var(--primary)">
          {name}
        </Typography>
      </Box>
    </Grid>
  );
};
export default Item;

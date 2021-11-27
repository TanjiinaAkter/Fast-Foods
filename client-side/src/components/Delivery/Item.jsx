import { Box, Grid, Typography } from "@mui/material";
const Item = ({ title, description, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box textAlign="center">
        <Box>{icon}</Box>
        <Typography variant="h5" color="var(--secondary)">
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Box>
    </Grid>
  );
};
export default Item;

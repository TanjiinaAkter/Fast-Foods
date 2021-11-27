import { Box, Grid, Typography } from "@mui/material";
const Item = ({ title, description, icon }) => {
  return (
    <Grid item xs={12} md={6}>
      <Box display="flex" alignItems="center">
        <Box pr="0.25rem">{icon}</Box>
        <Box>
          <Typography variant="h6" color="var(--primary)">
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
export default Item;

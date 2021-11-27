import { Box, Typography } from "@mui/material";

function Brand() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100px">
        <Box component="img" src="/static/fast-food.png" width="100%" />
      </Box>
      <Typography variant="h5" color="var(--secondary)">
        Fast Food
      </Typography>
    </Box>
  );
}
export default Brand;

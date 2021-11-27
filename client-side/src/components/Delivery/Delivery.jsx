import { Favorite as FavoriteIcon } from "@mui/icons-material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Box, Grid } from "@mui/material";
import Container from "../Common/Container";
import Item from "./Item";
const iconStyle = { fontSize: "5rem", color: "var(--neutral)" };
const Delivery = () => {
  return (
    <Box py="4rem">
      <Container>
        <Grid container spacing={3}>
          <Item
            icon={<FavoriteIcon style={iconStyle} />}
            title="Choose Foods"
            description="User generated content in will have multiple touchpoints for offshoring."
          />
          <Item
            icon={<DirectionsBikeIcon style={iconStyle} />}
            title="Delivery or Takeaway"
            description="Nanotechnology immersion along the information will close the loop."
          />
          <Item
            icon={<FastfoodIcon style={iconStyle} />}
            title="Enjoy Foods"
            description="Praesent interdum mollis neque. In along egestas nulla eget pede."
          />
        </Grid>
      </Container>
    </Box>
  );
};
export default Delivery;

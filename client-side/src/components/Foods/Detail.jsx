import { DirectionsBike as DirectionsBikeIcon } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useHistory } from "react-router";
import appContext from "../../context/context";
import Container from "../Common/Container";
import ListItem from "../Common/ListItem";
import Ratings from "../Common/Ratings";
const FoodDetail = () => {
  const {
    state: {
      singleFood,
      admin: { isLoggedIn },
    },
  } = useContext(appContext);

  const history = useHistory();
  const handleClickOrder = () => {
    history.push(`/order/${singleFood._id}`);
  };
  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Box
              component="img"
              width="100%"
              height="auto"
              src={singleFood?.img || "N/A"}
            />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" py="0.5rem">
              {singleFood?.name || "N/A"}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" color="text.secondary" py="0.5rem">
              {singleFood?.description || "N/A"}
            </Typography>

            <ListItem name="Price" desc={singleFood?.price + "$" || "N/A"} />
            <ListItem name="Status" desc={singleFood?.stockStatus || "N/A"} />
            <ListItem name="Product Code" desc={singleFood?._id || "N/A"} />
            <ListItem
              name="Ratings:"
              desc={<Ratings ratings={singleFood?.ratings} />}
              isNoneDivider
            />

            <Box color="var(--secondary)">
              <Button
                onClick={handleClickOrder}
                fullWidth
                variant="outlined"
                mx="0.5rem"
                color="inherit"
                startIcon={<DirectionsBikeIcon />}
                disabled={isLoggedIn}
              >
                Order Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default FoodDetail;

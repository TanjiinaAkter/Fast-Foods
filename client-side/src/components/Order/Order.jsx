import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import appContext from "../../context/context";
import Container from "../Common/Container";
import ListItem from "../Common/ListItem";
import Food from "./Food";
import Info from "./Info";
const Order = () => {
  const {
    state: { orderFoodQuantity, singleFood },
    handleSubmitOrderFood,
  } = useContext(appContext);
  const fullNameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const getValue = (x) => x.current.value;
  const clearValue = (x) => (x.current.value = "");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitOrderFood(
      {
        fullname: getValue(fullNameRef),
        address: getValue(addressRef),
        phone: getValue(phoneRef),
        email: getValue(emailRef),
        food: singleFood._id,
        quantity: orderFoodQuantity,
      },
      history
    );

    clearValue(addressRef);
    clearValue(phoneRef);
  };
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Food />
          </Grid>
          <Grid item md={8}>
            <Typography variant="h5" color="var(--primary)" py="0.5rem">
              Your Detail
            </Typography>

            <Info
              fullNameRef={fullNameRef}
              addressRef={addressRef}
              phoneRef={phoneRef}
              emailRef={emailRef}
            />
            <Typography variant="h5" color="var(--primary)" py="0.5rem">
              Order Detail
            </Typography>

            <ListItem name="Quantity" desc={orderFoodQuantity} />
            <ListItem
              name="Total Price"
              desc={singleFood?.price * orderFoodQuantity + "$"}
            />
            <Box color="var(--secondary)">
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                mx="0.5rem"
                color="inherit"
                startIcon={<CheckIcon />}
              >
                Confirm Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Order;

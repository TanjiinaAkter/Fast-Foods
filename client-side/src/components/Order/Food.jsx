import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import appContext from "../../context/context";
import Container from "../Common/Container";

const Food = () => {
  const {
    state: { orderFoodQuantity, singleFood },
    handleChangeOrderQuantity,
    setAlertMessage,
  } = useContext(appContext);

  const increaseQty = () => {
    handleChangeOrderQuantity(orderFoodQuantity + 1);
  };
  const decreaseQty = () => {
    if (orderFoodQuantity === 1) {
      setAlertMessage("info", "At least one quantity of food for an order");
      return;
    }
    handleChangeOrderQuantity(orderFoodQuantity - 1);
  };
  const getDesc = () => {
    if (singleFood?.description) {
      if (singleFood.description.length > 3) {
        return singleFood.description.slice(0, 100) + "...";
      } else {
        return singleFood.description;
      }
    }
  };
  return (
    <Container>
      <Box>
        <Box
          component="img"
          width="100%"
          height="auto"
          src="/static/burger.png"
        />

        <Typography variant="h4" py="0.5rem">
          {singleFood?.name || "N/A"}
        </Typography>
        <Divider />

        <Typography variant="subtitle2" color="text.secondary">
          Product Code :
          <Typography
            component="span"
            variant="subtitle2"
            color="var(--primary)"
            py="0.5rem"
          >
            {" "}
            {singleFood?._id || "N/A"}
          </Typography>
        </Typography>

        <Typography variant="h6" color="var(--primary)" py="0.5rem">
          Price :
          <Typography
            component="span"
            variant="h5"
            color="var(--secondary)"
            py="0.5rem"
            align="right"
          >
            {" "}
            {singleFood?.price || "N/A"}
            {"$"}
          </Typography>
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          {getDesc()}
        </Typography>
        <Box
          border="1px solid var(--secondary)"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          color="var(--secondary)"
          borderRadius="1rem"
          my="1rem"
        >
          <IconButton color="inherit" onClick={increaseQty}>
            <AddIcon />
          </IconButton>
          <Typography
            component="span"
            variant="h5"
            color="var(--primary)"
            py="0.5rem"
            align="right"
          >
            {orderFoodQuantity}
          </Typography>
          <IconButton color="inherit" onClick={decreaseQty}>
            <RemoveIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};
export default Food;

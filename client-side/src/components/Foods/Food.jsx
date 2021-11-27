import {
  Delete as DeleteIcon,
  DirectionsBike as DirectionsBikeIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Box, Button, CardActionArea, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import appContext from "../../context/context";
import ConfirmAlert from "../Common/ConfirmAlert";
import Ratings from "../Common/Ratings";

const Food = ({ food, handleClickUpdate }) => {
  const {
    state: {
      admin: { isLoggedIn },
    },
    deleteFoodHandleSubmit,
  } = useContext(appContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClickDetail = () => {
    history.push(`/foods/${food._id}`);
  };
  const handleClickOrder = () => {
    history.push(`/order/${food._id}`);
  };
  const handleClickDeleteToggle = () => {
    setOpen(!open);
  };
  const handleClickDeleteFood = async () => {
    await deleteFoodHandleSubmit(food._id);
    setOpen(false);
  };
  const handleClickEdit = () => {
    handleClickUpdate(food);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <ConfirmAlert
        open={open}
        msg="food"
        handleClose={handleClickDeleteToggle}
        handleSubmit={handleClickDeleteFood}
      />
      <Box boxShadow={2} height="100%" overflow="hidden" borderRadius="1.5rem">
        <CardActionArea onClick={() => history.push(`/foods/${food._id}`)}>
          <Box component="img" width="100%" height="300px" src={food.img} />
        </CardActionArea>
        <Box p="0.5rem">
          <Typography variant="h5" align="center">
            {food.name}
          </Typography>
          <Typography
            py="0.5rem"
            variant="h5"
            color="var(--secondary)"
            align="center"
          >
            {food.price}$
          </Typography>
          <Box display="flex" justifyContent="center">
            <Ratings ratings={food.ratings} withoutTitle />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            p="1rem"
            color={isLoggedIn ? "var(--primary)" : "var(--secondary)"}
          >
            <Button
              onClick={isLoggedIn ? handleClickEdit : handleClickDetail}
              fullWidth
              variant="outlined"
              mx="0.5rem"
              color="inherit"
              startIcon={isLoggedIn ? <EditIcon /> : <VisibilityIcon />}
            >
              {isLoggedIn ? "Edit" : "Details"}
            </Button>
            <Box width="1rem" />
            <Button
              onClick={isLoggedIn ? handleClickDeleteToggle : handleClickOrder}
              fullWidth
              mx="0.5rem"
              variant={isLoggedIn ? "outlined" : "text"}
              color={isLoggedIn ? "error" : "inherit"}
              startIcon={isLoggedIn ? <DeleteIcon /> : <DirectionsBikeIcon />}
            >
              {isLoggedIn ? "Delete" : "Order Now"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Food;

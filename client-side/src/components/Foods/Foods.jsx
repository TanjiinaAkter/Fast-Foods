import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import appContext from "../../context/context";
import Container from "../Common/Container";
import AddFood from "./AddFood";
import Food from "./Food";
import UpdateModal from "./UpdateModal";

const Foods = ({ isNone, limit }) => {
  const {
    state: {
      foods,
      admin: { isLoggedIn },
    },
    updateFoodHandleSubmit,
  } = useContext(appContext);
  const [food, setFood] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickUpdateToggle = (fd) => {
    setOpen(!open);
    setFood(fd);
  };
  const handleChange = (e) => {
    e.persist();
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFoodHandleSubmit(food);
    setOpen(false);
    setFood(null);
  };
  return (
    <Box>
      <UpdateModal
        open={open}
        food={food}
        handleToggle={handleClickUpdateToggle}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Container>
        <Box
          display={"flex"}
          justifyContent="space-between"
          flexDirection={isMD ? "column-reverse" : "row"}
          alignItems="center"
        >
          <Typography variant="h6" color="var(--primary)">
            Total Foods:
            <Typography
              component="span"
              color="var(--secondary)"
              variant="subtitle1"
            >
              {foods?.length || "N/A"}
            </Typography>
          </Typography>
          {isLoggedIn && !isNone && <AddFood />}
        </Box>
        <Grid container spacing={2}>
          {foods.slice(0, limit || foods.length).map((food) => (
            <Food
              food={food}
              key={food._id}
              handleClickUpdate={handleClickUpdateToggle}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default Foods;

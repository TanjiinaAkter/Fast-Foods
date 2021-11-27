import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Container from "../Common/Container";
import Button from "./Button";
import Carousel from "./Carousel";
import styles from "./style.module.css";
const images = [
  {
    label: "Thin and Crispy Ortolana",
    imgPath: "/static/burger.png",
  },
  {
    label: "Mushroom and Mascarpone",
    imgPath: "/static/pizza.png",
  },
];

const Slide = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const [step, setStep] = useState(0);
  const getCurrentStep = (step) => {
    setStep(step);
  };
  return (
    <Box className={styles.slider}>
      <img
        src="/static/slider/3.jpg"
        alt="website slideimage"
        className={styles.img}
      />
      <Box className={styles.textContent}>
        <Container>
          <Box
            height="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container spacing={3}>
              <Grid item sx={12} md={6}>
                <Box py={isMD ? "0.25rem" : "2rem"}>
                  <Typography color="var(--white)" variant={isMD ? "h5" : "h3"}>
                    Welcome to
                  </Typography>
                  <Typography color="var(--white)" variant={isMD ? "h4" : "h2"}>
                    Fast Food Shop
                  </Typography>
                </Box>
                <Typography color="var(--white)" variant={isMD ? "h6" : "h4"}>
                  {images[step].label}
                </Typography>
                <Typography
                  color="var(--white)"
                  variant={isMD ? "subtitle2" : "subtitle1"}
                  pb={isMD ? "1rem" : "2rem"}
                  maxWidth="600px"
                >
                  100 % Grass-fed beef patty, cheddar cheese, special sauce,
                  tomato, pickles, lettuce, sesame seed bun
                </Typography>
                <Button
                  isSecondary
                  py={isMD ? "0.25rem" : "1rem"}
                  path="/foods"
                >
                  Get Menu
                </Button>
              </Grid>
              {!isMD && (
                <Grid item md={6}>
                  <Carousel images={images} getCurrentStep={getCurrentStep} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Slide;

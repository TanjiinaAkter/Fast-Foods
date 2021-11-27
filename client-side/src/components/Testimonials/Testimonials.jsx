import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Container from "../Common/Container";
import Item from "./Item";
import testimonials from "./testimonials";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box py="5rem">
      <Container>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {testimonials.map(({ id, list }) => (
            <Grid container spacing={2} key={id}>
              {list.map((item) => (
                <Item {...item} key={item.title} />
              ))}
            </Grid>
          ))}
        </AutoPlaySwipeableViews>
      </Container>
    </Box>
  );
}

export default SwipeableTextMobileStepper;

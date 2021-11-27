import { Box, Typography } from "@mui/material";
import Container from "../components/Common/Container";
import Title from "../components/Common/Title";

const About = () => {
  return (
    <Container>
      <Box py="4rem">
        <Title fTitle="About" lTitle="US" />
        <Typography variant="subtitle1" pt="1rem" align="center">
          We are lucky to live in a glorious age that gives us everything we
          could ask for as a human race. What more could you need when you have
          meat covered in cheese nestled between bread. From smashed patties at
          Shake Shack to Glamburgers at Honky Tonk, there’s a little something
          for everyone. Some burgers are humble, and some are ostentatious, and
          you just have to try them all to figure out what you want. Feel free
          to contact us.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

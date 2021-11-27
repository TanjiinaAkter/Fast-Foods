import { Box, Divider, Typography } from "@mui/material";

const About = () => (
  <Box>
    <Typography color="var(--white)" variant="h5">
      About US
    </Typography>
    <Box py="0.5rem">
      <Divider />
    </Box>
    <Typography variant="body1" color="var(--neutral)">
      We are lucky to live in a glorious age that gives us everything we could
      ask for as a human race. What more could you need when you have meat
      covered in cheese nestled between bread. From smashed patties at Shake
      Shack to Glamburgers at Honky Tonk, there’s a little something for
      everyone. Some burgers are humble, and some are ostentatious, and you just
      have to try them all to figure out what you want. Feel free to contact us.
    </Typography>
  </Box>
);

export default About;

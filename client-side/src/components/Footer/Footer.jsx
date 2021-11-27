import { Box, Grid } from "@mui/material";
import Container from "../Common/Container";
import About from "./About";
import FooterBottom from "./FooterBottom";
import Gallery from "./Gallery";
import RelatedLinks from "./RelatedLinks";
const Footer = () => (
  <Box component="footer" bgcolor="var(--primary)">
    <Container>
      <Box py="2rem">
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <About />
          </Grid>

          <Grid item sm={3}>
            <RelatedLinks />
          </Grid>
          <Grid item sm={5}>
            <Gallery />
          </Grid>
        </Grid>
      </Box>
      <FooterBottom />
    </Container>
  </Box>
);

export default Footer;

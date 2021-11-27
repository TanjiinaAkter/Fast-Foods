import { Box } from "@mui/material";
import Container from "../components/Common/Container";
import Title from "../components/Common/Title";
import Gallery from "../components/Footer/Gallery";

const GalleryPage = () => {
  return (
    <Container>
      <Box py="4rem">
        <Title fTitle="Our" lTitle="Gallery" />
        <Gallery height={500} />
      </Box>
    </Container>
  );
};

export default GalleryPage;

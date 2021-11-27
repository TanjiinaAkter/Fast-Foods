import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Title from "../components/Common/Title";
import Delivery from "../components/Delivery/Delivery";
import DeliveryService from "../components/DeliveryService/DevliveryService";
import Foods from "../components/Foods/Foods";
import Slider from "../components/Slider/Slider";
import Testimonials from "../components/Testimonials/Testimonials";
import appContext from "../context/context";
function Home() {
  const { fetchFoodsData } = useContext(appContext);
  const history = useHistory();
  useEffect(() => {
    fetchFoodsData();
  }, []);
  return (
    <main>
      <Slider />
      <Box py="2rem">
        <Title
          fTitle="Easy"
          lTitle="Delivered"
          subTitle="Make your life easier by using our services!"
        />
        <Delivery />
      </Box>
      <Box py="2rem">
        <Title
          fTitle="Foods"
          lTitle="Menu"
          subTitle="Choose your desire foods"
        />
        <Foods isNone limit={6} />
        <Box color="var(--secondary)" m="auto" maxWidth="400px" py="2rem">
          <Button
            onClick={() => history.push("/foods")}
            variant="outlined"
            color="inherit"
            size="large"
            fullWidth
          >
            Get More
          </Button>
        </Box>
      </Box>
      <Box py="2rem">
        <Title
          fTitle="Our"
          lTitle="Delivery Service"
          subTitle="Slim just as it should be, crunchy and delicious, it can be in “classic” or black variant, an ideal base for carefully."
        />
        <DeliveryService />
      </Box>

      <Box py="2rem">
        <Title
          fTitle="Our"
          lTitle="Testimonials"
          subTitle="See what say about us of our clients"
        />
        <Testimonials />
      </Box>
    </main>
  );
}
export default Home;

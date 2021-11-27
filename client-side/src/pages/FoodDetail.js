import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FoodDetail from "../components/Foods/Detail";
import appContext from "../context/context";
function Shop() {
  const { fetchSingleFoodById } = useContext(appContext);
  const { id } = useParams();
  useEffect(() => {
    fetchSingleFoodById(id);
  }, []);

  return (
    <main>
      <Box py="2rem">
        <FoodDetail />
      </Box>
    </main>
  );
}
export default Shop;

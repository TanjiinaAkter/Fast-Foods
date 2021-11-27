import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import Title from "../components/Common/Title";
import Foods from "../components/Foods/Foods";
import appContext from "../context/context";
function FoodsPage() {
  const { fetchFoodsData } = useContext(appContext);
  useEffect(() => {
    fetchFoodsData();
  }, []);
  return (
    <main>
      <Box py="2rem">
        <Title
          fTitle="Foods"
          lTitle="Menu"
          subTitle="Choose your desire foods"
        />
        <Foods />
      </Box>
    </main>
  );
}
export default FoodsPage;

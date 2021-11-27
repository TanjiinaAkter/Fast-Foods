import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Grid } from "@mui/material";
import Container from "../Common/Container";
import Item from "./Item";
const iconStyle = { fontSize: "4.5rem", color: "var(--secondary)" };
const DeliveryService = () => {
  return (
    <Box py="4rem">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/static/delivery-service.jpg"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box display="flex" height="100%" alignItems="center">
              <Grid container spacing={2}>
                <Item
                  icon={<FoodBankIcon style={iconStyle} />}
                  title="Over 40 Foods Flavours"
                />
                <Item
                  icon={<AccessTimeFilledIcon style={iconStyle} />}
                  title="24 Hour Online Ordering"
                />
                <Item
                  icon={<HealthAndSafetyIcon style={iconStyle} />}
                  title="
                  Safe and Secure Delivery"
                />
                <Item
                  icon={<PhoneIcon style={iconStyle} />}
                  title="For Special Orders"
                  description="Call: 0123 456 789"
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default DeliveryService;

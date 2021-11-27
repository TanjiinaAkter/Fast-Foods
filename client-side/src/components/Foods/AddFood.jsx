import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddModal from "./AddModal";
const AddFood = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Box width="80%" display="flex" justifyContent="flex-end">
      <Box
        color="var(--primary)"
        maxWidth="400px"
        width="100%"
        pb="2rem"
        pt="1rem"
      >
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={handleToggle}
        >
          Add Food
        </Button>
      </Box>
      <AddModal open={open} handleToggle={handleToggle} />
    </Box>
  );
};

export default AddFood;

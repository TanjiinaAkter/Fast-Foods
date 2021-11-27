import { Add as AddIcon, Cancel as CancelIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useContext, useRef } from "react";
import appContext from "../../context/context";

export default function FormDialog({ open, handleToggle }) {
  const nameRef = useRef();
  const price = useRef();
  const statusRef = useRef();
  const ratings = useRef();
  const imgRef = useRef();
  const descriptionRef = useRef();
  const { addFoodHandleSubmit } = useContext(appContext);

  const getValue = (x) => x.current.value;
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    handleToggle();

    await addFoodHandleSubmit({
      name: getValue(nameRef),
      price: getValue(price),
      stockStatus: getValue(statusRef),
      description: getValue(descriptionRef),
      img: getValue(imgRef),
      ratings: getValue(ratings),
    });
  };
  return (
    <Dialog
      component="form"
      onSubmit={handleSubmitForm}
      open={open}
      onClose={handleToggle}
    >
      <DialogTitle> Add Food</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Food Name"
          fullWidth
          variant="outlined"
          inputRef={nameRef}
        />
        <TextField
          margin="dense"
          id="price"
          label="Food Price"
          fullWidth
          variant="outlined"
          inputRef={price}
        />
        <TextField
          margin="dense"
          id="status"
          label="Stock Status"
          fullWidth
          variant="outlined"
          inputRef={statusRef}
        />
        <TextField
          margin="dense"
          id="ratings"
          label="Ratings"
          fullWidth
          variant="outlined"
          inputRef={ratings}
        />
        <TextField
          margin="dense"
          id="img"
          label="Food Image URL"
          fullWidth
          variant="outlined"
          inputRef={imgRef}
        />
        <TextField
          margin="dense"
          id="status"
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          inputRef={descriptionRef}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          startIcon={<CancelIcon />}
          variant="outlined"
          color="error"
          onClick={handleToggle}
        >
          Cancel
        </Button>
        <Button
          startIcon={<AddIcon />}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

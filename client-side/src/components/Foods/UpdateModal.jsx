import { Cancel as CancelIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";

export default function FormDialog({
  open,
  handleToggle,
  food,
  handleSubmit,
  handleChange,
}) {
  return (
    <div>
      <Dialog
        component="form"
        onSubmit={handleSubmit}
        open={open}
        onClose={() => handleToggle(null)}
      >
        <DialogTitle>Update Food"</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Food Name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={food?.name || ""}
            name="name"
          />
          <TextField
            margin="dense"
            id="price"
            label="Food Price"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={food?.price || ""}
            name="price"
          />
          <TextField
            margin="dense"
            id="status"
            label="Stock Status"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={food?.stockStatus || ""}
            name="stockStatus"
          />
          <TextField
            margin="dense"
            id="ratings"
            label="Ratings"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={food?.ratings || ""}
            name="ratings"
          />
          <TextField
            margin="dense"
            id="img"
            label="Food Image URL"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={food?.img || ""}
            name="img"
          />
          <TextField
            margin="dense"
            id="status"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={handleChange}
            value={food?.description || ""}
            name="description"
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            startIcon={<CancelIcon />}
            variant="outlined"
            color="error"
            onClick={() => handleToggle(null)}
          >
            Cancel
          </Button>
          <Button
            startIcon={<EditIcon />}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

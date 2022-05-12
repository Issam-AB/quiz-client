import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate } from "react-router-dom";

const PopupCategory = ({ openForm, close }) => {
  const handleClick = () => {};
  return (
    <div>
      <Dialog open={openForm} onClose={close}>
        <DialogTitle>Subject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a quiz, please enter your subject name here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleClick}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupCategory;

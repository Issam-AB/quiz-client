import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PopupCategory = ({ openForm, close }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = React.useState("");
  const [openToaster, setOpenToaster] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToaster(false);
  };

  const handleClick = () => {
    subject !== "" ? navigate("/create-quiz") : setOpenToaster(true);
  };

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
            onChange={(e) => setSubject(e.target.value)}
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
          />

          {/* {JSON.stringify(subject)} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleClick}>Create</Button>
        </DialogActions>
        {openToaster && (
          <Snackbar
            open={openForm}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Please Enter Subject Name
            </Alert>
          </Snackbar>
        )}
      </Dialog>
    </div>
  );
};

export default PopupCategory;

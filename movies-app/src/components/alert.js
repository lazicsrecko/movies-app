import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

const Alerts = (props) => {
  const { open, message, closeAlert } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => closeAlert(null)}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{message}</Alert>
      </Stack>
    </Snackbar>
  );
};
export default Alerts;

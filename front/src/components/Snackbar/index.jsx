import { Snackbar, Alert } from "@mui/material";

export default function SnackbarWrapper({
  open,
  body,
  severity,
  handleClose,
  ...otherProps
}) {
  const configSnackbar = {
    open: open,
    severity: severity,
    onClose: handleClose,
    autoHideDuration: 4000,
    ...otherProps,
  };

  const configAlert = {
    severity: severity,
    onClose: handleClose,
    variant: "filled",
    width: "100%",
  };

  return (
    <Snackbar {...configSnackbar}>
      <Alert {...configAlert}>{body}</Alert>
    </Snackbar>
  );
}
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Regular Button
const RButton = ({ text, action, icon }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        type="submit"
        variant="outlined"
        endIcon={icon}
        onClick={() => action()}
      >
        {text}
      </Button>
    </Stack>
  );
};

export default RButton;

import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #d4d4d4",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function ModalView({ open, setOpen, detailUser, load }) {
  console.log("detail user", detailUser);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {load ? (
            <CircularProgress />
          ) : (
            <>
              <Typography
                marginBottom={3}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                View User
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      fullWidth
                      disabled
                      color="red"
                      value={detailUser?.username}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "black",
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      disabled
                      value={detailUser?.first_name || ""}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "black",
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      disabled
                      value={detailUser?.last_name || ""}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "black",
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      disabled
                      value={detailUser?.email || ""}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "black",
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      disabled
                      value={detailUser?.phone || ""}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "black",
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={detailUser?.gender}
                        name="radio-buttons-group"
                      >
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            value="0"
                            control={<Radio disabled />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio disabled />}
                            label="Male"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
                sx={{ marginTop: 3 }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

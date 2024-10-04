import { putUpdateProfile } from "@/redux/action/user";
import CloseIcon from "@mui/icons-material/Close";
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
import { useDispatch } from "react-redux";

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

export default function ModalEdit({
  open,
  setOpen,
  detailProfile,
  handleChange,
  load,
}) {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const data = {};
    if (detailProfile?.first_name) {
      data.first_name = detailProfile.first_name;
    }
    if (detailProfile?.last_name) {
      data.last_name = detailProfile.last_name;
    }
    if (detailProfile?.email) {
      data.email = detailProfile.email;
    }
    if (detailProfile.phone) {
      data.phone = detailProfile.phone;
    }
    if (detailProfile.gender) {
      data.gender = detailProfile.gender;
    }
    dispatch(putUpdateProfile(data, setOpen));
  };
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Data Profile
                </Typography>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  size={20}
                  onClick={() => setOpen(!open)}
                />
              </Box>
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
                      value={detailProfile?.username || ""}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={detailProfile?.first_name || ""}
                      onChange={(e) =>
                        handleChange("first_name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={detailProfile?.last_name || ""}
                      onChange={(e) =>
                        handleChange("last_name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={detailProfile?.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      value={detailProfile?.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={detailProfile?.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        name="radio-buttons-group"
                      >
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
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
                onClick={handleSubmit}
                sx={{ marginTop: 3 }}
              >
                Simpan
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

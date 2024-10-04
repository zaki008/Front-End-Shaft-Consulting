import { Box, TextField } from "@mui/material";

const Filter = ({ data, handleChange }) => {
  console.log("filter data", data);
  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 2,
        display: "flex",
        gap: 3,
      }}
    >
      <TextField
        size="small"
        id="outlined-basic"
        label="Search Username"
        variant="outlined"
        value={data.username}
        fullWidth
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Search First Name"
        variant="outlined"
        value={data.fir}
        fullWidth
        onChange={(e) => handleChange("first_name", e.target.value)}
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Search Last Name"
        variant="outlined"
        value={data.last_name}
        fullWidth
        onChange={(e) => handleChange("last_name", e.target.value)}
      />
    </Box>
  );
};

export default Filter;

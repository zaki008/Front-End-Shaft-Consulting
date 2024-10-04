"use client";
import {
  deleteLogout,
  getCurrentUser,
  getUserByUsername,
  getUserList,
} from "@/redux/action/user";
import {
  Box,
  Button,
  Container,
  Grid2,
  Popover,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import Filter from "./Filter";
import ModalEdit from "./ModalEdit";
import ModalView from "./ModalView";

const User = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });
  const [debouncedFilter] = useDebounce(filter, 1000);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDetailUser, setShowDetailUser] = useState(false);
  const [detailUser, setDetailUser] = useState({});
  const [usernameView, setUsernimeView] = useState(null);
  const [dataProfile, setDataProfile] = useState({});
  const [loadModal, setLoadModal] = useState(false);

  const handleChangeFilter = (name, value) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProfile = (name, value) => {
    setDataProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getUserList(setData, setLoad, debouncedFilter, paginationModel));
  }, [paginationModel, debouncedFilter]);

  useEffect(() => {
    if (showModalEdit) {
      setLoadModal(true);
      dispatch(getCurrentUser(setDataProfile, setLoadModal));
    }
  }, [showModalEdit]);

  useEffect(() => {
    if (showDetailUser) {
      setLoadModal(true);
      dispatch(getUserByUsername(usernameView, setDetailUser, setLoadModal));
    }
  }, [showDetailUser, usernameView]);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel({
      page: newModel.page + 1,
      pageSize: newModel.pageSize,
    });
  };

  const handleEdit = (username) => {
    setShowDetailUser(!showDetailUser);
    setUsernimeView(username);
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handleEdit(params?.row?.username)}
              sx={{ marginRight: 1 }}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container maxWidth="md">
      <Grid2 container justifyContent={"center"}>
        <Grid2 size={12} marginTop={3}>
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h3">List Users</Typography>
            <Button
              aria-describedby={id}
              variant="contained"
              size="small"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              {userData.first_name}
            </Button>
          </Box>
          <Filter data={filter} handleChange={handleChangeFilter} />
        </Grid2>
        <Grid2 size={12} sx={{ justifyContent: "center", display: "flex" }}>
          <Paper
            sx={{ height: 500, width: { xs: "100%", md: "100%", lg: "100%" } }}
          >
            <DataGrid
              loading={load ? true : false}
              rows={data.data}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20, 30]}
              sx={{ border: 0 }}
              onPaginationModelChange={handlePaginationModelChange}
              getRowId={(row) => row.id}
              rowCount={data?.pagging?.total_item}
              paginationMode="server"
            />
          </Paper>
        </Grid2>
        <ModalView
          open={showDetailUser}
          setOpen={setShowDetailUser}
          detailUser={detailUser}
          load={loadModal}
        />
        <ModalEdit
          open={showModalEdit}
          setOpen={setShowModalEdit}
          detailProfile={dataProfile}
          handleChange={handleChangeProfile}
          load={loadModal}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography
            sx={{ p: 1, cursor: "pointer" }}
            onClick={() => {
              setShowModalEdit(!showModalEdit);
            }}
          >
            Update Profile
          </Typography>
          <Typography
            sx={{ p: 1, cursor: "pointer" }}
            onClick={() => dispatch(deleteLogout(router))}
          >
            Logout
          </Typography>
        </Popover>
      </Grid2>
    </Container>
  );
};

export default User;

import { API_HOST } from "@/config/api";
import { alertMessage } from "@/utils/alertMessage";
import Axios from "axios";
import Cookies from "js-cookie";

export const getUserList =
  (setData, setLoad, filter, paginationModel) => async (dispatch) => {
    try {
      const { first_name, username, last_name } = filter;
      const { page, pageSize } = paginationModel;
      setLoad(true);
      const queryParams = [];
      if (first_name) queryParams.push(`first_name=${first_name}`);
      if (username) queryParams.push(`username=${username}`);
      if (last_name) queryParams.push(`last_name=${last_name}`);
      if (page) queryParams.push(`page=${page}`);
      if (pageSize) queryParams.push(`size=${pageSize}`);

      const queryString = queryParams.join("&");

      const token = Cookies.get("tokenLogin");
      const res = await Axios.get(
        `${API_HOST.baseApiDev}/users/list?${queryString}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res) {
        setLoad(false);
        const result = res.data.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData({
          data: result,
          pagging: res?.data.paging,
        });
      }
    } catch (err) {
      setLoad(false);
      // alertMessage(err?.response?.data?.message, "error");
    }
  };

export const getUserByUsername =
  (username, setDataDetail, setLoad) => async (dispatch) => {
    try {
      const token = Cookies.get("tokenLogin");
      const res = await Axios.get(`${API_HOST.baseApiDev}/user/${username}`, {
        headers: {
          authorization: token,
        },
      });
      if (res) {
        setLoad(false);
        setDataDetail(res.data.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("err data", err);
    }
  };

export const getCurrentUser = (setData, setLoad) => async (dispatch) => {
  try {
    const token = Cookies.get("tokenLogin");
    const res = await Axios.get(`${API_HOST.baseApiDev}/user/current`, {
      headers: {
        authorization: token,
      },
    });
    if (res) {
      setLoad(false);
      console.log("res sukses", res);
      setData(res.data.data);
    }
  } catch (err) {
    setLoad(false);
    console.log("err data", err);
  }
};

export const putUpdateProfile = (data, setOpen) => async (dispatch) => {
  try {
    const token = Cookies.get("tokenLogin");
    const res = await Axios.put(`${API_HOST.baseApiDev}/user/current`, data, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    if (res) {
      alertMessage(res?.data?.message, "success");
      setOpen(false);
    }
  } catch (err) {
    console.log("err data", err.response?.data.errors);
    alertMessage(err?.response?.data?.errors, "error");
  }
};

export const deleteLogout = (router) => async (dispatch) => {
  try {
    const token = Cookies.get("tokenLogin");
    const res = await Axios.delete(`${API_HOST.baseApiDev}/users/logout`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    if (res) {
      console.log("res sukses", res);
      alertMessage(res?.data?.data, "success");
      Cookies.remove("tokenLogin");
      Cookies.remove("userData");
      dispatch({ type: "RESET" });
      router.push("/auth/signin");
    }
  } catch (err) {
    console.log("err logout", err);
    alertMessage(err?.response?.data?.errors, "error");
  }
};

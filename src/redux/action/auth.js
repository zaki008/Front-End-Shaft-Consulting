import { API_HOST } from "@/config/api";
import { alertMessage } from "@/utils/alertMessage";
import Axios from "axios";
import Cookies from "js-cookie";

export const postLogin = (data, router, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    const res = await Axios.post(`${API_HOST.baseApiDev}/users/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      setLoad(false);
      const token = `Bearer ${res.data.token}`;
      Cookies.set("tokenLogin", token);
      Cookies.set("userData", res.data?.data);
      alertMessage(res?.data?.message, "success");
      dispatch({ type: "SET_USER_DATA", value: res.data?.data });
      router.push("/users");
    }
  } catch (err) {
    setLoad(false);
    alertMessage(err?.response?.data?.errors, "error");
  }
};

export const postRegister = (data, router, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    const res = await Axios.post(
      `${API_HOST.baseApiDev}/users/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res) {
      setLoad(false);
      alertMessage(res?.data?.message, "success");
      router.push("/auth/signin");
    }
  } catch (err) {
    setLoad(false);
    alertMessage(err?.response?.data?.errors, "error");
  }
};

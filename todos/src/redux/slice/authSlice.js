import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../utils/clientUtils";

const initialState = {
  info: {},
  status: "idle",
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async (params, thunkApi) => {
    try {
      const response = await client.get(`/api-key?email=${params}`);
      console.log(response);

      const apiKey = response.data.data.apiKey;

      if (apiKey) {
        localStorage.setItem("apiKey", apiKey);
        return apiKey;
      }
    } catch (error) {
      return thunkApi.rejectWithValue({
        code: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.info.apiKey = action.payload;
        state.status = "success";
      })
      .addCase(authLogin.rejected, (state) => {
        state.status = "error";
      });
  },
});

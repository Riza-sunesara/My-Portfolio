import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    loading: false,
    certificates: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllcertificatesRequest(state, action) {
      state.certificates = [];
      state.error = null;
      state.loading = true;
    },
    getAllcertificatesSuccess(state, action) {
      state.certificates = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllcertificatesFailed(state, action) {
      state.certificates = state.certificates;
      state.error = action.payload;
      state.loading = false;
    },
    addNewcertificatesRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewcertificatesSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewcertificatesFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deletecertificatesRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletecertificatesSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deletecertificatesFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetCertificateSlice(state, action) {
      state.error = null;
      state.certificates = state.certificates;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.certificates = state.certificates;
    },
  },
});

export const getAllCertificates = () => async (dispatch) => {
  dispatch(
    certificateSlice.actions.getAllcertificatesRequest()
  );
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/certificate/getall",
      { withCredentials: true }
    );
    dispatch(
      certificateSlice.actions.getAllcertificatesSuccess(
        response.data.certificates
      )
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.getAllcertificatesFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewcertificate = (data) => async (dispatch) => {
  dispatch(
    certificateSlice.actions.addNewcertificatesRequest()
  );
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/certificate/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      certificateSlice.actions.addNewcertificatesSuccess(
        response.data.message
      )
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.addNewcertificatesFailed(
        error.response.data.message
      )
    );
  }
};

export const deletecertificate = (id) => async (dispatch) => {
  dispatch(
    certificateSlice.actions.deletecertificatesRequest()
  );
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/certificate/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      certificateSlice.actions.deletecertificatesSuccess(
        response.data.message
      )
    );
    dispatch(certificateSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      certificateSlice.actions.deletecertificatesFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllCertificateErrors = () => (dispatch) => {
  dispatch(certificateSlice.actions.clearAllErrors());
};

export const resetcertificateSlice = () => (dispatch) => {
  dispatch(certificateSlice.actions.resetCertificateSlice());
};

export default certificateSlice.reducer;

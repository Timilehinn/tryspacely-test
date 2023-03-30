import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  changedPlatform: null,
  emailBackup: null,
  idBackup: null,
  init2FA: {},
  signupEmail: null,
  signUpBody: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  signUpWorkspace: 0,
  signupAddress: {
    address: "",
    city: "",
    country: "",
    state: "",
  },
  signupJob: {
    checked: [],
    company: "",
    position: "",
  },

  isOauthObj: {
    email: "",
    provider: "",
    providerId: "",
    usingSocial: false,
    firstName: "",
    lastName: "",
  },
};

export const authRelatedSlice = createSlice({
  name: "authrelated",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setInit2FA: (state, action) => {
      state.init2FA = action.payload;
    },
    setEmailBackup: (state, action) => {
      state.emailBackup = action.payload;
    },
    setIdBackup: (state, action) => {
      state.idBackup = action.payload;
    },
    setChangedPlatform: (state, action) => {
      state.changedPlatform = action.payload;
    },
    setSignupEmail: (state, action) => {
      state.signupEmail = action.payload;
    },
    setSignUpBody: (state, action) => {
      state.signUpBody = action.payload;
    },
    setSignUpWorkspace: (state, action) => {
      state.signUpWorkspace = action.payload;
    },
    setSignupAddress: (state, action) => {
      state.signupAddress = action.payload;
    },
    setSignupJob: (state, action) => {
      state.signupJob = action.payload;
    },
    setIsOauthObj: (state, action) => {
      state.isOauthObj = action.payload;
    },
  },
});

export const getToken = (state) => state.authrelated.token;
export const getInit2FA = (state) => state.authrelated.init2FA;
export const getEmailBackup = (state) => state.authrelated.emailBackup;
export const getIdBackup = (state) => state.authrelated.idBackup;
export const getChangedPlatform = (state) => state.authrelated.changedPlatform;
export const getSignupEmail = (state) => state.authrelated.signupEmail;
export const getSignUpBody = (state) => state.authrelated.signUpBody;
export const getSignUpWorkspace = (state) => state.authrelated.signUpWorkspace;
export const getSignupAddress = (state) => state.authrelated.signupAddress;
export const getSignupJob = (state) => state.authrelated.signupJob;
export const getIsOauthObj = (state) => state.authrelated.isOauthObj;

export const {
  setChangedPlatform,
  setSignupEmail,
  setSignUpBody,
  signUpWorkspace,
  setSignupAddress,
  setSignupJob,
  setToken,
  setInit2FA,
  setEmailBackup,
  setIdBackup,
  setIsOauthObj,
} = authRelatedSlice.actions;
export default authRelatedSlice.reducer;

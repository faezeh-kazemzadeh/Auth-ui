import api from "../config/api";

export const signIn = async (credential) => {
  const response = await api.post("/api/auth/signin", credential);
  return response.data;
};

export const signUp = async (credential) => {
  const response = await api.post("/api/auth/signup", credential);
  return response.data;
};

export const signOut = async () => {
  const response = await api.post("/api/auth/signout");
  return response.data;
};

export const updateProfile = async (credentials) => {
  try {
    const response = await api.put("/api/auth/profile", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/api/auth/forgot-password", email);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const resetPassword = async (token, password) => {
  try {
    const response = await api.put(
      `/api/auth/reset-password/${token}`,
      password
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const validateToken = async (token) => {
  try {
    const response = await api.get(`/api/auth/validate-token/${token}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

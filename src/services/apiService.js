import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKED_URL_WP
});

const getTokenData = async (loginData) => {
  const response = await api
    .post("/jwt-auth/v1/token", {
      username: loginData.email,
      password: loginData.password,
    })
    .catch((error) => error.response.status);

  if (response === 403) {
    return response;
  }

  if (response.status === 200) {
    return response.data;
  }

  return false;
};

const validateToken = async (token) => {
  const response = await api.post(`/jwt-auth/v1/token/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return !!response;
};

const login = async (loginData) => {
  const tokenData = await getTokenData(loginData);

  if (tokenData === 403) {
    return tokenData;
  }

  try {
    const response = await api.get(`/wp/v2/users/${tokenData.user_id}`, {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });
    const data = response.data;
    sessionStorage.setItem("token", tokenData.token);
    sessionStorage.setItem("userID", data.id);
    sessionStorage.setItem("username", `${data.first_name} ${data.last_name}`);
    sessionStorage.setItem("avatarURL", data.avatar);
    sessionStorage.setItem("loggedIn", true);

    return true;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  sessionStorage.clear();
};

const register = async (registerData) => {
  try {
    const response = await api.post("/eucapacito/v1/register?_embed", {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    })
    const tokenData = await getTokenData({
      email: registerData.email,
      password: registerData.password,
    });
    const data = response.data;
    sessionStorage.setItem("token", tokenData.token);
    sessionStorage.setItem("userID", data.id);
    sessionStorage.setItem("username", `${data.first_name} ${data.last_name}`);
    sessionStorage.setItem("loggedIn", true);
    return { 'status': true };
  } catch (error) {
    return { 'status': false, 'message': error.response.data };
  }
}

const updateProfile = async (profileData) => {
  try {
    const response = await api.post("/eucapacito/v1/update-profile?_embed", {...profileData})
    return { 'status': true, 'message': response.data };
  } catch (error) {
    return { 'status': false, 'message': error.response.data };
  }
}

const recoverPassword = async (mail) => {
  try {
    const response = await api.post("/eucapacito/v1/recoverpwd?_embed", {email: mail})
    return { 'status': true, 'message': response.data };
  } catch (error) {
    return { 'status': false, 'message': error.response.data };
  }
}

const changePassword = async (formData) => {
  try {
    const response = await api.post("/eucapacito/v1/changepwd?_embed", {...formData})
    return { 'status': true, 'message': response.data };
  } catch (error) {
    return { 'status': false, 'message': error.response.data };
  }
}

const apiService = {
  api,
  login,
  logout,
  validateToken,
  register,
  updateProfile,
  recoverPassword,
  changePassword
};

export default apiService;

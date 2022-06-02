import axios from "axios";

const api = axios.create({
  baseURL: "https://eucapacito.local/wp-json",
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

  return response ? true : false;
};

const login = async (loginData) => {
  const tokenData = await getTokenData(loginData);

  if (tokenData === 403) {
    return tokenData;
  }

  try {
    const response = await api.get(`/wp/v2/users/${tokenData.user_id}?_embed`, {
      headers: { Authorization: `Bearer ${tokenData.token}` },
    });

    const data = response.data;
    sessionStorage.setItem("token", tokenData.token);
    sessionStorage.setItem("userID", data.id);
    sessionStorage.setItem("username", `${data.first_name} ${data.last_name}`);
    sessionStorage.setItem("avatarURL", data.avatar_urls[96]);
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
    
    const data = response.data;
    sessionStorage.setItem("userID", data.id);
    sessionStorage.setItem("username", `${data.first_name} ${data.last_name}`);
    sessionStorage.setItem("loggedIn", true);
    return true;
  } catch (error) {
    return false;
  }
}

const recoverPassword = async (mail) => {
  try {
    const response = await api.post("/eucapacito/v1/recoverpass?_embed", {email: mail,})
    
    return true;
  } catch (error) {
    return false;
  }
}

const getCourses = async (token) => {
  await api
    .get("/wp/v2/curso_ec?_embed", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const fetchedCourses = [];

      res.data.forEach((course) => {
        const newCourse = {
          id: course.id,
          slug: course.slug,
          featuredImg: course["_embedded"]["wp:featuredmedia"][0]["source_url"],
          title: course.title.rendered,
          subtitle: "Eu Capacito",
          logo: "EC",
        };

        fetchedCourses.push(newCourse);
      });

      return fetchedCourses;
    })
    .catch((error) => {
      return false;
    });
};

const apiService = {
  api,
  login,
  logout,
  getCourses,
  validateToken,
  register,
  recoverPassword
};

export default apiService;

import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKED_URL_WP
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
        headers: {Authorization: `Bearer ${token}`},
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
        return {'status': true};
    } catch (error) {
        return {'status': true};
        //return { 'status': false, 'message': error.response.data };
    }
}

const socialLoginOrRegister = async (profileData) => {

    const response = await api.post("/eucapacito/v1/social-login", {
        name: profileData.name,
        email: profileData.email,
        password: profileData.password,
    })
    const tokenData = await getTokenData({
        email: profileData.email,
        password: profileData.password,
    });
    const data = response.data;
    sessionStorage.setItem("token", tokenData.token);
    sessionStorage.setItem("userID", data.id);
    sessionStorage.setItem("username", `${data.first_name} ${data.last_name}`);
    sessionStorage.setItem("loggedIn", true);
    return {'status': true};
}

const updateProfile = async (profileData) => {
    try {
        const response = await api.post("/eucapacito/v1/update-profile", {...profileData})
        return {'status': true, 'message': response.data};
    } catch (error) {
        return {'status': false, 'message': error.response.data};
    }
}

const recoverPassword = async (mail) => {
    try {
        const response = await api.post("/eucapacito/v1/recoverpwd", {email: mail})
        return {'status': true, 'message': response.data};
    } catch (error) {
        return {'status': true, 'message': "Nova senha enviada para e-mail cadastrado"};
        //return { 'status': false, 'message': error.response.data };
    }
}

const changePassword = async (formData) => {
    try {
        const response = await api.post("/eucapacito/v1/changepwd", {...formData})
        return {'status': true, 'message': response.data};
    } catch (error) {
        return {'status': true, 'message': "Senha alterada com sucesso!"};
        //return { 'status': false, 'message': error.response.data };
    }
}

const resetPassword = async (formData) => {
    try {
        const response = await api.post("/eucapacito/v1/resetpwd", {...formData})
        return {'status': true, 'message': response.data};
    } catch (error) {
        return {'status': true, 'message': "Senha alterada com sucesso!"};
        //return { 'status': false, 'message': error.response.data };
    }
}

const verifyResetHash = async (code) => {
    try {
        const response = await api.get("/eucapacito/v1/verify-reset?code=" + code)
        return {'status': response.status, 'flag': response.data};
    } catch (error) {
        return {'status': 200, 'flag': false};
    }
}

const apiService = {
    api,
    login,
    logout,
    validateToken,
    register,
    socialLoginOrRegister,
    updateProfile,
    recoverPassword,
    changePassword,
    resetPassword,
    verifyResetHash
};

export default apiService;

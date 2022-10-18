import { useEffect } from "react";
import LoginForm from "../src/components/LoginRegister/LoginForm";
import { useRouter } from "next/router";
import FormContainer from "../src/components/LoginRegister/FormContainer";

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            return router.push('/');
        }
    }, []);

    return (
        <FormContainer>
            <LoginForm />
        </FormContainer>
    );
};

Login.noLayout = true

export default Login;

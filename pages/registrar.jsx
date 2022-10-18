import { useEffect } from "react";
import RegisterForm from "../src/components/LoginRegister/RegisterForm";
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
            <RegisterForm />
        </FormContainer>
    );
};

Login.noLayout = true

export default Login;

import { useEffect } from "react";
import PasswordReset from "../src/components/LoginRegister/PasswordReset";
import { useRouter } from "next/router";
import FormContainer from "../src/components/LoginRegister/FormContainer";

const RedefinirSenha = () => {
    const router = useRouter()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            return router.push('/');
        }
    }, []);

    return (
        <FormContainer>
            <PasswordReset />
        </FormContainer>
    );
};

RedefinirSenha.noLayout = true

export default RedefinirSenha;
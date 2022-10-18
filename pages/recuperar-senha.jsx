import PasswordRecoveryForm from "../src/components/LoginRegister/PasswordRecoveryForm";
import FormContainer from "../src/components/LoginRegister/FormContainer";

const RecuperarSenha = () => {

    return (
        <FormContainer>
            <PasswordRecoveryForm />
        </FormContainer>
    );
};

RecuperarSenha.noLayout = true

export default RecuperarSenha;
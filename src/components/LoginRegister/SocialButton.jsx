import React from 'react';
import {Button} from "@mui/material";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
    render() {
        const { children, triggerLogin, ...props } = this.props;
        return (
            <Button onClick={triggerLogin} {...props}>
                {children}
            </Button>
        );
    }
}

export default SocialLogin(SocialButton);
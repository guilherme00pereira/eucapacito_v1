import {useState} from "react";
import {Container, Box, MobileStepper, Button} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";

import EuCapacitoLogo from '../../public/assets/img/logo.png';
import Btn from "../../src/components/Button";
import ArrowRightPath from "../../public/assets/img/arrow-right.png";

import NameForm from "../../src/components/EmployabilityRegister/NameForm";
import DateForm from "../../src/components/EmployabilityRegister/DateForm";
import CpfForm from "../../src/components/EmployabilityRegister/CpfForm";
import EmailForm from "../../src/components/EmployabilityRegister/EmailForm";
import PhoneForm from "../../src/components/EmployabilityRegister/PhoneForm";
import CityForm from "../../src/components/EmployabilityRegister/CityForm";
import GenderForm from "../../src/components/EmployabilityRegister/GenderForm";
import EducationForm from "../../src/components/EmployabilityRegister/EducationForm";
import TermsForm from "../../src/components/EmployabilityRegister/TermsForm";
import Link from "next/link";
import Image from "next/image";


const EmployabilityRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        day: "",
        month: "",
        year: "",
        cpf: "",
        email: "",
        ddd: "",
        phone: "",
        city: "",
        gender: "",
        color: "",
        level: "",
        course: "",
        awareness: false,
        shareData: false,
    });
    const [currentStep, setCurrentStep] = useState(0);

    const handleBackStep = () => setCurrentStep(currentStep - 1);
    const handleNextStep = () =>
        currentStep < 9 && setCurrentStep(currentStep + 1);

    const thisStep = (step) => {
        switch (step) {
            case 0:
                return <NameForm form={formData} handler={setFormData} />
            case 1:
                return <DateForm form={formData} handler={setFormData} />
            case 2:
                return <CpfForm form={formData} handler={setFormData}/>
            case 3:
                return <EmailForm form={formData} handler={setFormData}/>
            case 4:
                return <PhoneForm form={formData} handler={setFormData}/>
            case 5:
                return <CityForm form={formData} handler={setFormData}/>
            case 6:
                return <GenderForm form={formData} handler={setFormData}/>
            case 7:
                return <EducationForm form={formData} handler={setFormData}/>
            case 8:
                return <TermsForm form={formData} handler={setFormData}/>
            default:
                return <NameForm form={formData} handler={setFormData} />
        }
    }

    return (
        <Container sx={styles.container}>
            <Box elevation={0} sx={{mt: '25px', mb: '50px', textAlign: 'center'}}>
                <Link href="/">
                    <Image src={EuCapacitoLogo} alt="Logo EuCapacito"/>
                </Link>
            </Box>

            <Box sx={styles.root}>
                <Box>
                    <MobileStepper
                        variant="progress"
                        steps={9}
                        position="static"
                        activeStep={currentStep}
                        sx={styles.stepper}
                        LinearProgressProps={styles.stepper.bar}
                        nextButton={<Button sx={styles.stepper.nextArrow}></Button>}
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBackStep}
                                disabled={currentStep === 0}
                                sx={styles.stepper.backArrow}
                            >
                                <KeyboardArrowLeft/>
                            </Button>
                        }
                    />
                </Box>

                {thisStep(currentStep)}

                {currentStep < 8 && (
                    <Btn onClick={handleNextStep} sx={styles.submitButton}>
                        Continuar <img src={ArrowRightPath} alt="Ícone - Seta para direita"/>
                    </Btn>
                )}
            </Box>
        </Container>
    );
};

export default EmployabilityRegister;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    root: {
        border: "1px solid #77837F",
        borderRadius: "0.5rem",
        width: {
            md: "760px"
        }
    },
    stepper: {
        backgroundColor: "unset",
        nextArrow: {visibility: "hidden"},
        backArrow: {
            color: "#34EDAC",
            "&.Mui-disabled": {
                color: "rgba(51, 237, 172, 0.3)",
            },
            "& svg": {
                fontSize: "2.5rem",
            },
        },
        bar: {
            sx: {
                border: "1px solid #77837F",
                borderRadius: "2px",
                backgroundColor: "unset",
                height: "20px",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: "#33EDAC",
                },
            },
        },
    },
    submitButton: {
        margin: "0 auto",
        px: "3rem",
        display: "flex",
        bottom: "-23.5px",
        "&:hover": {
            boxShadow: "0px 16px 30px rgb(77 197 145 / 30%)",
            backgroundColor: "#33EDAC",
        },
        img: {
            ml: "1rem",
            fontSize: "30px",
        },
    },
};

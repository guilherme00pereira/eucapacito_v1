import { useState } from "react";
import { Container, Box, MobileStepper, Button } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from 'react-router-dom';

import EuCapacitoLogo from '../assets/img/logo.png';
import Btn from "../components/Button";
import ArrowRightPath from "../assets/img/arrow-right.png";

import NameForm from "../components/EmployabilityRegister/NameForm";
import DateForm from "../components/EmployabilityRegister/DateForm";
import CpfForm from "../components/EmployabilityRegister/CpfForm";
import EmailForm from "../components/EmployabilityRegister/EmailForm";
import PhoneForm from "../components/EmployabilityRegister/PhoneForm";
import CityForm from "../components/EmployabilityRegister/CityForm";
import GenderForm from "../components/EmployabilityRegister/GenderForm";
import EducationForm from "../components/EmployabilityRegister/EducationForm";
import TermsForm from "../components/EmployabilityRegister/TermsForm";

const formList = {
  0: <NameForm />,
  1: <DateForm />,
  2: <CpfForm />,
  3: <EmailForm />,
  4: <PhoneForm />,
  5: <CityForm />,
  6: <GenderForm />,
  7: <EducationForm />,
  8: <TermsForm />,
};

const EmployabilityRegister = () => {
  // const [form, setForm] = useState({
  //   name: "",
  //   day: "",
  //   month: "",
  //   year: "",
  //   cpf: "",
  //   email: "",
  //   ddd: "",
  //   phone: "",
  //   city: "",
  //   gender: "",
  //   color: "",
  //   level: "",
  //   course: "",
  //   awareness: false,
  //   shareData: false,
  // });
  const [currentStep, setCurrentStep] = useState(0);

  const handleBackStep = () => setCurrentStep(currentStep - 1);
  const handleNextStep = () =>
    currentStep < 8 && setCurrentStep(currentStep + 1);

  // const handleFormField = (field) => field;

  return (
    <Container sx={styles.container}>
      <Box elevation={0} sx={{ mt: '100px', mb: '50px', textAlign: 'center' }}>
        <Link to="/">
          <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
        </Link>
      </Box>

      <Box sx={styles.root}>
        <Box>
          <MobileStepper
            variant="progress"
            steps={10}
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
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </Box>

        {formList[currentStep]}

        {currentStep !== 8 && (
          <Btn onClick={handleNextStep} sx={styles.submitButton}>
            Continuar <img src={ArrowRightPath} alt="Ícone - Seta para direita" />
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
    nextArrow: { visibility: "hidden" },
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

/* eslint-disable react/prop-types */
import { Step, Stepper, Typography } from "@material-tailwind/react";
import { StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon fontSize="small" />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon fontSize="small" />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon fontSize="small" />,
    },
  ];

  return (
    <div className="w-full py-6 mt-2 mb-2">
      <Stepper alternativeLabel activeStep={activeStep} className="bg-white">
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep > index}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "black" : "rgba(0, 0, 0, 0.5)",
              }}
              icon={
                <div
                  className={`w-10 h-10 rounded-full ${
                    activeStep >= index
                      ? "bg-black text-white"
                      : "bg-gray-300 text-black"
                  }`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </div>
              }
            />
            <Typography
              variant="small"
              className={`font-medium ${
                activeStep === index ? "text-black" : "text-gray-600"
              }`}
            >
              {item.label}
            </Typography>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;

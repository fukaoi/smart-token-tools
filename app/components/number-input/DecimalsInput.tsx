import * as React from "react";
import {
  NumberInputProps,
  Unstable_NumberInput as BaseNumberInput,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { UserConfig, UserConfigFnPromise } from "vite";
import { useController, UseControllerProps } from "react-hook-form";
import { useControlled } from "@mui/material";
import SugbHeadlineTypography from "~/components/typography/HeadlineTypography";
import DescriptionTypography from "~/components/typography/DescriptionTypography";
import ExampleTypography from "~/components/typography/ExampleTypography";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const description = `The value of this setting specifies the number of decimal points in the token.
     Please refer to the example below.`;
  const example = `
     0 decimals:  1000,                   1
     1 decimals:  1000.0,                0.1
     2 decimals:  1000.00,              0.01
     3 decimals:  1000.000,            0.001
     4 decimals:  1000.0000,          0.0001
     5 decimals:  1000.00000,        0.00001
     7 decimals:  1000.000000,      0.000001
     8 decimals:  1000.0000000,    0.0000001
     9 decimals:  1000.00000000,  0.00000001
    `;
  return (
    <>
      <SugbHeadlineTypography message="Input token decimals" />
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <AddIcon fontSize="small" />,
            className: "increment",
            type: "button",
          },
          decrementButton: {
            children: <RemoveIcon fontSize="small" />,
            type: "button",
          },
        }}
        {...props}
        ref={ref}
      />
    </>
  );
});

const DecimalsInput = (props: UseControllerProps<any>) => {
  const { field } = useController(props);
  return (
    <NumberInput
      aria-label="Decimals Input"
      min={0}
      max={9}
      {...field}
      onChange={(event, value) => {
        field.onChange(value);
      }}
    />
  );
};

export default DecimalsInput;

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 4px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 30px;
  height: 30px;
  display: flex;
  margin: 2px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

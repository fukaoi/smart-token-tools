import type { FC } from "react";
import { theme } from "~/utils/colorTheme";

const ExampleTypography: FC<{ example: string }> = ({ example }) => {
  return (
    <pre
      style={{
        textAlign: "left" as const,
        fontSize: "15px",
        marginLeft: "1em",
        marginBottom: "2em",
        color: theme.palette.textBlack.light,
        backgroundColor: theme.palette.limeLight.main,
        padding: "10px",
        borderRadius: "8px",
        fontFamily: "Source Code Pro",
      }}
    >
      e.g:
      {example}
    </pre>
  );
};

export default ExampleTypography;

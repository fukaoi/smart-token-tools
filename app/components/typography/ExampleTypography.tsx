import { FC } from "react";
import { theme } from "~/utils/colorTheme";

const styles = {
  pre: {
    textAlign: "left" as const,
    fontSize: "15px",
    marginLeft: "1em",
    marginBottom: "2em",
    color: theme.palette.textBlack.light,
    backgroundColor: theme.palette.limeLight.main,
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "Source Code Pro",
  },
};

const ExampleTypography: FC<{ example: string }> = ({ example }) => {
  return (
    <pre style={styles.pre}>
      e.g:
      {example}
    </pre>
  );
};

export default ExampleTypography;

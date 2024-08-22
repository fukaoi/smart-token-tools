import CssBaseline from "@mui/material/CssBaseline";
import logoImage from "~/assets/smt-logo.svg";
import Box from "@mui/material/Box";
import { Link, useLocation } from "@remix-run/react";

const styles = {
  box: {
    letterSpacing: "3px",
    fontSize: "17px",
    display: "inline-block",
    marginLeft: "20px",
    marginRight: "10px",
    width: "140px",
    backgroundColor: "rgba(3,3,3, 0.5)",
    marginBottom: "12px",
    borderRadius: "1px",
    paddingTop: "10px",
    boxShadow: "0 10px 25px 0 rgba(0, 0, 0, .5)",
    paddingBottom: "10px",
    "&:hover": {
      backgroundColor: "rgb(1, 130, 105, 0.5)",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const Header = () => {
  const location = useLocation();

  return (
    <Box style={{ marginBottom: "3em" }}>
      <CssBaseline />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            flexBasis: "25%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "0.5em",
          }}
        >
          <a href="/">
            <img src={logoImage} alt="Smart token tool" width={"60%"} />
          </a>
        </Box>

        <Box
          style={{
            flexBasis: "50%",
            paddingTop: "1em",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {location.pathname !== "/" && (
            <>
              <Link to="/token" style={styles.link}>
                <Box style={styles.box}>Token</Box>
              </Link>
              <Link to="/nft" style={styles.link}>
                <Box style={styles.box}>NFT</Box>
              </Link>
              <Link to="/faucet" style={styles.link}>
                <Box style={styles.box}>Faucet</Box>
              </Link>
            </>
          )}
        </Box>

        <Box style={{ flexBasis: "25%" }}></Box>
      </Box>
    </Box>
  );
};

export default Header;

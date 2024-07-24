import logoImage from "../../assets/smt-logo.svg";
import { Box, Grid } from "@mui/material";
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
    <Box sx={{ marginBottom: "3em" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Box
            sx={{
              paddingTop: "0.5em",
            }}
          >
            <a href="/">
              <img
                src={logoImage}
                alt="Smart token tool"
                width={"60%"}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ paddingTop: "1em" }}>
          {location.pathname !== "/" &&
            (
              <>
                <Link to="/token" style={styles.link}>
                  <Box sx={styles.box}>
                    Token
                  </Box>
                </Link>
                <Link to="/nft" style={styles.link}>
                  <Box sx={styles.box}>
                    NFT
                  </Box>
                </Link>
                <Link to="/faucet" style={styles.link}>
                  <Box sx={styles.box}>
                    Faucet
                  </Box>
                </Link>
              </>
            )}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Header;

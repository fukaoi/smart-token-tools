import logoImage from "../../assets/smt-logo.svg";
import { Box, Grid } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";

const styles = {
  naviLink: {
    letterSpacing: "3px",
    fontSize: "30px",
    display: "inline-block",
    marginLeft: "20px",
    marginRight: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

const Header = () => {
  const location = useLocation();

  return (
    <Box>
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
                width={"55%"}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {location.pathname !== "/" &&
            (
              <>
                <Box style={styles.naviLink}>
                  <Link to="/token" style={styles.link}>
                    Token
                  </Link>
                </Box>
                <Box style={styles.naviLink}>
                  <Link to="/nft" style={styles.link}>
                    NFT
                  </Link>
                </Box>
                <Box style={styles.naviLink}>
                  <Link to="/faucet" style={styles.link}>
                    Faucet
                  </Link>
                </Box>
              </>
            )}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Header;

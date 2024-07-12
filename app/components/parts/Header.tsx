import logoImage from "../../assets/smt-logo.svg";
import { Box, Grid } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";

const styles = {
  naviLink: {
    letterSpacing: "3px",
    fontSize: "20px",
    display: "inline-block",
    marginLeft: "20px",
    marginRight: "10px",
    width: "200px",
    backgroundColor: "rgba(3,3,3, 0.6)",
    marginBottom: "12px",
    borderRadius: "1px",
    paddingTop: "10px",
    paddingBottom: "10px",
    "&:hover": {
      backgroundColor: "rgba(16, 130, 105, 0.6)",
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
                width={"60%"}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {location.pathname !== "/" &&
            (
              <>
                <Link to="/token" style={styles.link}>
                  <Box style={styles.naviLink}>
                    Token
                  </Box>
                </Link>
                <Link to="/nft" style={styles.link}>
                  <Box style={styles.naviLink}>
                    NFT
                  </Box>
                </Link>
                <Link to="/faucet" style={styles.link}>
                  <Box style={styles.naviLink}>
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

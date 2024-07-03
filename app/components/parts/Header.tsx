import { Link } from "@remix-run/react";
import logoImage from "../../assets/smt-logo.svg";
import { Box, Grid } from "@mui/material";

const styles = {
  navi: {
    justifyContent: "left",
  },
  naviLink: {
    letterSpacing: "3px",
    fontSize: "20px",
    display: "inline-block",
    marginLeft: "20px",
    marginRight: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  grid: {
    height: "10vh",
  },
  logoImage: {
    paddingTop: "1em",
    marginBottom: "0",
  },
};

const Header = () => {
  return (
    <Box sx={styles.navi}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={styles.grid}
      >
        <Grid item xs={3}>
          <Box sx={styles.logoImage}>
            <a href="/">
              <img
                src={logoImage}
                alt="Smart token tool"
                width={500}
                height={142}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Header;

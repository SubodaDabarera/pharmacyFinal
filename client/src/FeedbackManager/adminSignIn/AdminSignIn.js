import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import SideDrawer from "../../components/SideDrawer";
import FloatCard from "../../components/FloatCard";
import { Link, useHistory } from "react-router-dom";
import { adminSingIn } from "../../utils/FetchData";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    minHeight: "550px",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
  },
  mainGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  topBarGrid: {
    paddingTop: "22px !important",
    marginBottom: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  sideDrawer: {
    minWidth: "17.9%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "16.66667%",
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  container: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  submit: {
    width: "30%",
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    margin: " 5% 35% 5% 35%",
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  textField: {
    margin: 10,
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginBottom: 20,
    fontWeight: 500,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 20,
    display: "contents",
  },
  containedGrid: {
    margin: "1em",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
  },
}));
// end of the styles

function AdminSignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault(); //this one is used for prevent page loading after submit it

    console.log(email, password);

    adminSingIn("http://localhost:8000/admin/signIn", { email, password })
      .then((res) => {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userRole");
        sessionStorage.setItem("userName", JSON.stringify(res.data.name));
        sessionStorage.setItem("userRole", JSON.stringify(res.data.role));

        history.goBack(); //go back to previous page
        // window.location.reload(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={classes.root}>
      <div className="overlay">
        <Container maxWidth={false} className={classes.container}>
          <Grid
            container
            direction="row"
            spacing={3}
            className={classes.mainGrid}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              xs={12}
              spacing={3}
              className={classes.topBarGrid}
              direction="column"
              justify="space-between"
            >
              <Grid item sm={12}>
                <Topbar />
              </Grid>
              <Grid item xs={12}>
                <SideDrawer />
              </Grid>
            </Grid>
          </Grid>

          {/* ####################################### */}

          <Card className={classes.root}>
            <center>
              <Grid item xs={12} sm={5} className={classes.containedGrid}>
                <FloatCard>
                  <div style={{ marginTop: "50px" }}>
                    <div className={classes.paper}>
                      {/* Title */}
                      <Typography
                        component="h1"
                        variant="h5"
                        className={classes.title}
                      >
                        Admin Log In
                      </Typography>

                      {/* Login Form */}
                      <form className={classes.form} onSubmit={submitHandler}>
                        {" "}
                        {/* onSubmit={submitHandler}*/}
                        <TextField
                          required
                          name="email"
                          // onChange={setForm}
                          // value={formData.email}

                          onChange={(e) => setEmail(e.target.value)}
                          id="outlined-required"
                          label="Email Address"
                          type="email"
                          className={classes.textField}
                        />
                        <TextField
                          required
                          name="password"
                          // onChange={setForm}
                          // value={formData.password}

                          onChange={(e) => setPassword(e.target.value)}
                          id="outlined-password-input"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          className={classes.textField}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          className={classes.submit}
                        >
                          Log In
                        </Button>
                      </form>
                    </div>

                    <Link to="/login">
                      <h3>I am Customer</h3>{" "}
                    </Link>
                  </div>
                </FloatCard>
              </Grid>
            </center>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default AdminSignIn;

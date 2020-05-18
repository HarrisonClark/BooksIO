import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

import firebase from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: "25px",
  },
  break: {
    flexBasis: "100%",
    height: "0",
  },
});

export default function Navigation({
  library = false,
  search = false,
  setUid,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  function LibraryNav() {
    let history = useHistory();

    function handleClick() {
      history.push("/library");
    }

    if (library) {
      return (
        <Button color="inherit" onClick={handleClick}>
          View Your Library
        </Button>
      );
    } else {
      return <div />;
    }
  }

  function SearchNav() {
    let history = useHistory();

    function handleClick() {
      history.push("/");
    }

    if (search) {
      return (
        <Button color="inherit" onClick={handleClick}>
          Search for Books
        </Button>
      );
    } else {
      return <div />;
    }
  }

  LoginDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  function LoginDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [haveAccount, setHaveAccount] = useState(true);

    const onEmailChange = (e) => {
      setEmailField(e.target.value);
    };

    const onPasswordChange = (e) => {
      setPasswordField(e.target.value);
    };

    function handleSignUp() {
      if (emailField.length < 4) {
        alert("Please enter an email address.");
        return;
      }
      if (passwordField.length < 4) {
        alert("Please enter a password.");
        return;
      }

      // LOGIN if appropriate
      if (haveAccount) {
        firebase
          .auth()
          .signInWithEmailAndPassword(emailField, passwordField)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === "auth/wrong-password") {
              alert("Wrong password.");
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
      }
      // SIGNUP new user otherwise
      else {
        // Create user with email and pass.
        // [START createwithemail]
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailField, passwordField)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === "auth/weak-password") {
              alert("The password is too weak.");
            } else {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
      }
    }

    const onSubmit = (e) => {
      e.preventDefault();
      console.log("E: " + emailField + " P: " + passwordField);
      handleSignUp();
      setOpen(false);
    };
    const handleClose = () => {
      onClose(selectedValue);
    };

    if (authenticated) {
      return (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <Box className={classes.container} style={{ width: "350px" }}>
            Profile
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                firebase.auth().signOut();
              }}
              style={{ marginBottom: "15px" }}
            >
              Sign Out
            </Button>
          </Box>
        </Dialog>
      );
    } else {
      return (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <form onSubmit={onSubmit} style={{ width: "350px" }}>
            <Box className={classes.container}>
              <div className={classes.break}></div>

              <TextField
                label="email"
                variant="filled"
                onChange={onEmailChange}
                value={emailField}
                style={{
                  width: "250px",
                  marginBottom: "25px",
                  marginTop: "15px",
                }}
              />
              <div className={classes.break}></div>
              <TextField
                label="password"
                type="password"
                variant="filled"
                onChange={onPasswordChange}
                value={passwordField}
                style={{ width: "250px", marginBottom: "25px" }}
              />
              <div className={classes.break}></div>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                style={{ marginBottom: "15px" }}
              >
                {haveAccount ? "Login" : "SignUp"}
              </Button>
              <div className={classes.break}></div>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setHaveAccount((h) => !h);
                  console.log("click");
                }}
                style={{ marginBottom: "15px" }}
              >
                {haveAccount
                  ? "Don't Have An Account?"
                  : "Already Have An Account?"}
              </Button>
            </Box>
          </form>
        </Dialog>
      );
    }
  }

  function LoginProfile() {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (value) => {
      setOpen(false);
    };

    if (authenticated) {
      return (
        <>
          <Button onClick={handleClickOpen}>Profile</Button>
          <LoginDialog open={open} onClose={handleClose} />
        </>
      );
    } else {
      return (
        <>
          <Button onClick={handleClickOpen}>Login</Button>
          <LoginDialog open={open} onClose={handleClose} />
        </>
      );
    }
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Books.io
        </Typography>
        <LibraryNav />
        <SearchNav />
        <LoginProfile />
      </Toolbar>
    </AppBar>
  );
}

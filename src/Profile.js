import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({});

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setUid(user.uid);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  function EditProfile() {
    let history = useHistory();

    function handleClick() {
      history.push("/edit-profile");
    }

    if (authenticated) {
      return (
        <Button color="inherit" onClick={handleClick}>
          Edit Profile
        </Button>
      );
    } else {
      return <div />;
    }
  }

  return (
    <Box>
      <Navigation search={true} library={true} />
      <Container>Your Profile</Container>
      <EditProfile />
    </Box>
  );
}

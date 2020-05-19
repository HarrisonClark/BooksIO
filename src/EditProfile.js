import React, { useState, useEffect } from "react";
import Book from "./components/Book";
import Navigation from "./components/Navigation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";

const useStyles = makeStyles({});

export default function App() {
  return (
    <Box>
      <Navigation search={true} library={true} />
      <Container>Edit Your Profile</Container>
    </Box>
  );
}

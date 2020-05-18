import React, { useState, useEffect } from "react";
import "./App.css";
import Book from "./components/Book";
import Navigation from "./components/Navigation";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";
const db = firebase.firestore();

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <Box>
      <Navigation search={true} />
      <ShowBooks />
    </Box>
  );

  function ShowBooks() {
    const [books, setBooks] = useState([]);
    const classes = useStyles();

    useEffect(() => {
      db.collection("Library")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let newBook = { id: doc.id, ...doc.data() };
            setBooks((b) => [...b, newBook]);
          });
        });
    }, []);

    if (!books) {
      return <h1> Loading </h1>;
    } else {
      return (
        <Box>
          <h1 style={{ textAlign: "center" }}>Your Library</h1>
          <Box className={classes.container}>
            {books.map((book) => (
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                img={book.img}
                author={book.author}
                inLibrary={true}
              />
            ))}
          </Box>
        </Box>
      );
    }
  }
}

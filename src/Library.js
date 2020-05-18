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
  const [uid, setUid] = useState(null);
  return (
    <Box>
      <Navigation search={true} />
      <ShowBooks />
    </Box>
  );

  function ShowBooks() {
    const [books, setBooks] = useState([]);
    const classes = useStyles();
    const [toggle, Toggle] = useState(true);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        } else {
          setUid(null);
        }
      });
    }, []);

    useEffect(() => {
      if (uid) {
        setBooks([]);
        db.collection("users")
          .doc(uid)
          .collection("library")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              let newBook = { id: doc.id, ...doc.data() };
              setBooks((b) => [...b, newBook]);
            });
          });
      }
    }, [toggle]);

    useEffect(() => {
      if (uid) {
        db.collection("users")
          .doc(uid)
          .collection("library")
          .onSnapshot(function (doc) {
            Toggle((t) => !t);
          });
      }
    }, []);

    if (!books) {
      return <h1> Loading </h1>;
    } else {
      console.log(books);
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
                uid={uid}
              />
            ))}
          </Box>
        </Box>
      );
    }
  }
}

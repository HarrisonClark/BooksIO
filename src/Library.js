import React, { useState, useEffect } from "react";
import "./App.css";
import Book from "./components/Book";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import NavLink from "react-router-dom/NavLink";

import firebase from "./firebase";
const db = firebase.firestore();

export default function App() {
  return (
    <Box>
      <Button variant="contained" size="large">
        <NavLink class="Button" to={"/"}>
          Search for Books
        </NavLink>
      </Button>
      <ShowBooks />
    </Box>
  );

  function ShowBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      db.collection("Library")
        .get()
        .then((snapshot) => {
          console.log(snapshot);
          snapshot.forEach((doc) => {
            let newBook = { id: doc.id, ...doc.data() };
            setBooks((b) => [...b, newBook]);
          });
        });
    }, []);

    console.log("hello");
    console.log(books);

    if (!books) {
      return <h1> Loading </h1>;
    } else {
      return (
        <Box>
          <h1 style={{ textAlign: "center" }}>Your Library</h1>
          <ul>
            {books.map((book) => (
              <Book
                id={book.id}
                title={book.title}
                img={book.img}
                author={book.author}
                inLibrary={true}
              />
            ))}
          </ul>
        </Box>
      );
    }
  }
}

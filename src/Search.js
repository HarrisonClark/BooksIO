import React, { useState, useEffect } from "react";
import Book from "./components/Book";
import Navigation from "./components/Navigation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";

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

export default function App() {
  const [query, setQuery] = useState(null);
  const [uid, setUid] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, []);

  return (
    <Box>
      <Navigation library={true} setUid={setUid} />
      <Container>
        <Search />
      </Container>

      <Results />
    </Box>
  );

  function Search() {
    const [queryField, setQueryField] = useState("");

    const onChange = (e) => {
      setQueryField(e.target.value);
    };

    const onSubmit = (e) => {
      e.preventDefault();
      console.log(queryField);
      setQuery(queryField);
    };

    return (
      <form onSubmit={onSubmit} className={classes.form}>
        <Box className={classes.container}>
          <TextField
            label=""
            variant="filled"
            onChange={onChange}
            value={queryField}
            style={{ width: "50%", marginBottom: "25px" }}
          />
          <div className={classes.break}></div>
          <Button variant="outlined" size="large" type="submit">
            Search
          </Button>
        </Box>
      </form>
    );
  }

  function Results() {
    const [books, setBooks] = useState(null);
    useEffect(() => {
      if (query) {
        fetch("/api/books?title=" + query)
          .then((res) => res.json())
          .then((data) => setBooks(data));
      }
    }, []);

    function ShowBooks() {
      console.log(books);
      return (
        <Box className={classes.container}>
          {books.map((book) => (
            <Book
              id={book.id}
              title={book.title}
              img={book.image}
              author={book.author}
              uid={uid}
            />
          ))}
        </Box>
      );
    }

    if (!books) {
      return <div></div>;
    } else {
      return (
        <div>
          <ul>
            <ShowBooks />
          </ul>
        </div>
      );
    }
  }
}

import React, { useState, useEffect } from "react";
import "./App.css";
import Book from "./components/Book";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NavLink from "react-router-dom/NavLink";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    width: "100%",
  },
});

export default function App() {
  const [query, setQuery] = useState(null);
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Container>
        <Search />
      </Container>

      <Button variant="contained" size="large">
        <NavLink class="Button" to={"/library/"}>
          {" "}
          View Your Library{" "}
        </NavLink>
      </Button>

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
      <form onSubmit={onSubmit}>
        <TextField
          label=""
          variant="filled"
          onChange={onChange}
          value={queryField}
        />
        <br />
        <Button type="submit">Search</Button>
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
        <>
          {books.map((book) => (
            <Book
              id={book.id}
              title={book.title}
              img={book.image}
              author={book.author}
            />
          ))}
        </>
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

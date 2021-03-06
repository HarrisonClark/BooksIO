const express = require("express");
const app = express();
const fetch = require("isomorphic-fetch");
const path = require("path");

app.get("/api/books", async (req, res) => {
  try {
    // Grabbing the title query parameter from requests if it's provided
    // i.e. localhost:8080/api/books?title=joy+of+baking
    const { title } = req.query;
    if (!title) throw new Error("You must provide a title query parameter");

    // Making our request to Google Books
    const data = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" + title
    ).then((res) => res.json());
    // Doing some data manipulation to clean up our request
    const books = data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors && book.volumeInfo.authors.join(", "),
      description: book.volumeInfo.description,
      rating: book.volumeInfo.averageRating,
      image: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
    }));

    // Returning our books to the user
    res.json(books);
  } catch (error) {
    // Sending an error response if anything went wrong
    console.log(error);
    res.status(500).json({ error });
  }
});

// Static hosting of built React files
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port 8080");
});

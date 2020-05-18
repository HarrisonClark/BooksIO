import React, { useState } from "react";

import firebase from "../firebase";
import { Redirect } from "react-router-dom";
const db = firebase.firestore();

export default function Book({
  title,
  img,
  author,
  id,
  inLibrary = false,
  ...props
}) {
  const [deleted, setDeleted] = useState(false);

  function SaveRemoveBook() {
    if (!inLibrary) {
      return (
        <>
          <button
            onClick={() => {
              console.log(title);
              let addBook = db.collection("Library").doc(id).set({
                title: title,
                author: author,
                img: img,
              });
              console.log(addBook);
            }}
          >
            Add to Library
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              let deleteBook = db.collection("Library").doc(id).delete();
              setDeleted(true);
              console.log(deleteBook);
            }}
          >
            Remove from Library
          </button>
        </>
      );
    }
  }
  if (deleted) {
    return <div></div>;
  }
  return (
    <div className="container" style={{ display: "grid|inline" }}>
      <h1>{title}</h1>
      <h3>{author}</h3>
      <img src={img} alt={title} height="100px" />
      <SaveRemoveBook />
    </div>
  );
}

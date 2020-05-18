import React, { useState } from "react";

import firebase from "../firebase";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const db = firebase.firestore();

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: 25,
  },
  media: {
    height: 400,
  },
});

export default function Book({
  title,
  img,
  author,
  id,
  inLibrary = false,
  ...props
}) {
  const [deleted, setDeleted] = useState(false);
  const classes = useStyles();

  function SaveRemoveBook() {
    if (!inLibrary) {
      return (
        <>
          <Button
            onClick={() => {
              console.log(title);
              let addBook = db.collection("Library").doc(id).set({
                title: title,
                author: author,
                img: img,
              });
              console.log(addBook);
            }}
            color="primary"
          >
            Add to Library
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            onClick={() => {
              let deleteBook = db.collection("Library").doc(id).delete();
              setDeleted(true);
              console.log(deleteBook);
            }}
            color="primary"
          >
            Remove from Library
          </Button>
        </>
      );
    }
  }
  if (deleted) {
    return <div></div>;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            By {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <SaveRemoveBook />
      </CardActions>
    </Card>
  );
}

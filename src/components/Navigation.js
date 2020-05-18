import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: "25px",
  },
});

export default function Navigation({ library = false, search = false }) {
  const classes = useStyles();

  function LibraryNav() {
    let history = useHistory();

    function handleClick() {
      history.push("/library");
    }

    if (library) {
      return (
        <Button color="inherit" onClick={handleClick}>
          View Your Library
        </Button>
      );
    } else {
      return <div />;
    }
  }

  function SearchNav() {
    let history = useHistory();

    function handleClick() {
      history.push("/");
    }

    if (search) {
      return (
        <Button color="inherit" onClick={handleClick}>
          Search for Books
        </Button>
      );
    } else {
      return <div />;
    }
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Books.io
        </Typography>
        <LibraryNav />
        <SearchNav />
      </Toolbar>
    </AppBar>
  );
}

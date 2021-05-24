import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function TodoForm({ addTodo }) {
    const classes = useStyles();

    const [todo, setTodo] = useState("");
    const [name, setName] = useState("");

    const history = useHistory();

    const todoChangeHandler = e => setTodo(e.target.value);
    const nameChangeHandler = e => setName(e.target.value);

    const todoSubmitHandler = e => {
        e.preventDefault();

        if(todo.trim() === "" || name.trim() === "") return;

        // Create new todo object
        const newTodo = {
            todo,
            author: name,
            id: Math.round(Math.random() * 1000000)
        }

        // Add todo to App State
        addTodo(newTodo);

        // Clear fields on submit
        setTodo("");
        setName("");

        // Change url to homepage
        history.push('/');
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add todo
          </Typography>
          <form  onSubmit={todoSubmitHandler} noValidate>
            <TextField
            //   variant="outlined"
              margin="normal"
              required
              fullWidth
              id="todo"
              label="Add Todo"
              name="todo"
              autoFocus
              onChange={todoChangeHandler}
              value={todo}
            />
            <TextField
            //   variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Author"
              label="Author"
              type="Author"
              id="Author"
              onChange={nameChangeHandler}
              value={name}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Todo
            </Button>
          </form>
        </div>
      </Container>
    )
}

export default TodoForm

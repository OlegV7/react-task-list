import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase/config';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const emailValidation = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validation = re.test(String(email).toLowerCase());

  return validation;
}

const passwordValidation = pwd => {
  if(pwd.trim().length < 6) {
    return false;
  }

  return true;
};

export default function SignInSide({ user }) {
  const [isCreateAcc, setIsCreateAcc] = useState(false);

  const [accEmail, setAccEmail] = useState("");
  const [accPass, setAccPass] = useState("");
  // console.log(user)
  // const { currentUser } = useContext(AuthContext);

  const history = useHistory();

  const classes = useStyles();

  const authFormSubmitHandler = async (e) => {
    e.preventDefault();

    if(accEmail.trim() === "" || accPass.trim() === "") {
      alert('Please fill in the fields!');
      return;
    } 

    const isEmailValid = emailValidation(accEmail);

    if(!isEmailValid) {
      alert('Please enter a valid email.');
      return;
    };

    const isPwdValid = passwordValidation(accPass);

    if(!isPwdValid) {
      alert('The password should be at least 6 chars long.')
      return;  
    };

    try {
      if(isCreateAcc) {
        await auth.createUserWithEmailAndPassword(accEmail, accPass);
      } else {
        await auth.signInWithEmailAndPassword(accEmail, accPass);
      }

      history.replace('/');
    } catch(err) {
      console.log(err);
    }

    setAccEmail("");
    setAccPass("");

    window.location.reload(false);
  };

  const changeAuthState = () => setIsCreateAcc(prevAccState => !prevAccState);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {isCreateAcc ? 'Create New Account' : 'Sign in'}
          </Typography>
          <form className={classes.form} noValidate onSubmit={authFormSubmitHandler}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setAccEmail(e.target.value)}
              value={accEmail}
            //   error={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setAccPass(e.target.value)}
              value={accPass}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isCreateAcc ? 'Create Account' : 'Sign In'}
            </Button>
            <Grid container>
              {
                !isCreateAcc && (
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                )
              }
              <Grid item>
                <Link href="#" variant="body2" onClick={changeAuthState}>
                  {isCreateAcc ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
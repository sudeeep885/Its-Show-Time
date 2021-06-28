import React, { useState } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  textfield: {
    margin: theme.spacing(1),
    width: "99%",
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
}));

const LoginForm = ({setLoginDetail}) => {

  const classes = useStyles();
  const history = useHistory();
  const [isFailed, setIsFailed] = useState(false);

  const[formData, setFormData] = useState({
    email: '', password: ''
  });

  const handleSubmit = async () => {

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}jwt/create/`,
      headers: {'Content-Type': 'application/json'},
      data: formData
    }).then((response) => {
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setLoginDetail({isAuth: true, user: response.data.user});
      history.goBack();
    }).catch((error) => {
      setIsFailed(error.request.response);
    })

  };

  const changeHandler = (e) => {
    setFormData(prevState => {
      return {...prevState, [e.target.name]: e.target.value};
    });
  }


  return (
    <div>
      <Container className={classes.root} maxWidth="sm">
      {isFailed && <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {`${isFailed}`}
      </Alert>}
        <span className={classes.heading}><h3>Log In</h3><LockOpenTwoToneIcon fontSize='large' color='secondary' /></span>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              required
              className={classes.textfield}
              label="Email Address"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="standard-password-input"
              className={classes.textfield}
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </Grid>
        </Grid>
        <span className={classes.heading}><Button onClick={handleSubmit} variant="contained" color="primary">Log In</Button></span>
      </Container>
    </div>
  );
};

export default LoginForm;

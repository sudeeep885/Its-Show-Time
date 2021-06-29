import React, { useState } from "react";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';

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

const SignUpForm = () => {
  const classes = useStyles();

  const[formData, setFormData] = useState({
    first_name: '', second_name: '', email: '', password: '', phone_number: '', age: ''
  });
  // const [cpass, setCpass] = useState('');
  const [isSucess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = async () => {

    // if(cpass !== formData.password) {
    //   alert('password must match')
    //   return;
    // }

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}users/`,
      headers: {'Content-Type': 'application/json'},
      data: formData
    }).then(() => {
      setIsSuccess(true);
      setIsFailed(false);
    }).catch((error) => {
      setIsFailed(error.request.response);
    })

  };

  const changeHandler = (e) => {
    setFormData(prevState => {
      return {...prevState, [e.target.name]: e.target.value};
    });
  }

  // const cpassHandler = (e) => {
  //   if(cpass !== formData.password) {
  //     setPasswordNotMatch(true);
  //   } else setPasswordNotMatch(false);
  //   setCpass(e.target.value)
  // }

  return (
    <div>
      <Container className={classes.root} maxWidth="sm">
      {isSucess && <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Account Registered
      </Alert>}
      {isFailed && <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {`${isFailed}`}
      </Alert>}
        <span className={classes.heading}><h3>Sign Up</h3><LockTwoToneIcon fontSize='large' color='secondary' /></span>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              required
              className={classes.textfield}
              label="First Name"
              name="first_name"
              variant="outlined"
              value={formData.first_name}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.textfield}
              label="Last Name"
              name="second_name"
              variant="outlined"
              value={formData.second_name}
              onChange={changeHandler}
            />
          </Grid>
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
              className={classes.textfield}
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              // error={passwordNotMatch}
              required
              className={classes.textfield}
              label="Confirm Password"
              name="cpass"
              variant="outlined"
              type="password"
              value={cpass}
              onChange={cpassHandler}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              className={classes.textfield}
              label="Age"
              name="age"
              variant="outlined"
              type="number"
              value={formData.age}
              onChange={changeHandler}
            />
          </Grid>
        <Grid item xs={6}>
            <TextField
              className={classes.textfield}
              label="Phone Number"
              name="phone_number"
              variant="outlined"
              type="integer"
              value={formData.phone_number}
              onChange={changeHandler}
            />
          </Grid>
        </Grid>
        <span className={classes.heading}><Button onClick={handleSubmit} variant="contained" color="primary">Register</Button></span>
        {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}
      </Container>
    </div>
  );
};

export default SignUpForm;

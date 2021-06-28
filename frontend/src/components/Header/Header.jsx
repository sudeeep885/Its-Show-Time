import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import logo from '../../2_objects.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 56,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    position: 'fixed',
  },
  headerBtn: {
    margin: 5,
  }
}));

const Header = ({loginDetail, setLoginDetail}) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    setLoginDetail({isAuth: false, user: ''});
    alert('Successfully Logged Out');
    history.push('/');
  };

  const handleLogIn = () => {
    setAnchorEl(null);
    history.push('/login');
  };

  const handleSignUp = () => {
    setAnchorEl(null);
    history.push('/signup');
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar style={{justifyContent: 'space-between'}}>
          <img src={logo} />
          {/* <Typography variant="h6" className={classes.title}>
            It's Show Time
          </Typography> */}
          { loginDetail.isAuth ? 
              <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle /> {loginDetail.user}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  history.push(`/${loginDetail.user}/my-watchlist`)}
                  }>My Watchlist</MenuItem>
                {/* <MenuItem onClick={() => history.push('/user/my-wishlist')}>Edit Account</MenuItem> */}
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
            :   
                <div>
                <Button onClick={handleLogIn} className={classes.headerBtn} variant='contained' color='secondary'>Log In</Button>
                <Button onClick={handleSignUp} className={classes.headerBtn} variant='contained' color='secondary'>Sign Up</Button>
                </div>
            }

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
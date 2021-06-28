import React, { useEffect, useState } from 'react';
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav/MainNav";
import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import TvSeries from './pages/TvSeries/TvSeries';
import Search from './pages/Search/Search';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import DetailedView from './pages/DetailedView/DetailedView';
import WatchlistView from './pages/WatchlistView/WatchlistView';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3aecf1',
    },
    background: {
      paper: '#100e0e',
    },
  }
});


function App() {

  // const [isAuth, setIsAuth] = useState(false);
  // const [user, setUser] = useState('');

  const [loginDetail, setLoginDetail] = useState({
    isAuth: false, user: ''
  });

  useEffect(() => {
    if(localStorage.getItem('user')) {
      setLoginDetail({isAuth: true, user: localStorage.getItem('user')});
    }
  }, []);

  return (
    <Router>
      <Header loginDetail={loginDetail} setLoginDetail={setLoginDetail} />
      <ThemeProvider theme={darkTheme} >
        <CssBaseline />
      <div className="app">
        <Container>
          <Switch>
            <Route exact path='/' component={() => <Trending />}/>
            <Route exact path='/movies' component={() => <Movies />}/>
            <Route exact path='/tv-series' component={() => <TvSeries />}/>
            <Route exact path='/search' component={Search}/>
            <Route path='/signup' component={SignUpForm}/>
            <Route path='/login' component={() => <LoginForm setLoginDetail={setLoginDetail} />}/>
            <Route path='/movie/:id' component={() => <DetailedView setLoginDetail={setLoginDetail} />} />
            <Route path='/tv/:id' component={() => <DetailedView setLoginDetail={setLoginDetail} />} />
            <Route exact path='/:user/my-watchlist' render={() => (
              localStorage.getItem('user') ? (<WatchlistView setLoginDetail={setLoginDetail} />) : (<Redirect to='/login' />) 
            )} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
      </ThemeProvider>
    </Router>
  );
}

export default App;

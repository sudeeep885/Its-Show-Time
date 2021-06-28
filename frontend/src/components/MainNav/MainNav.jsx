import { React, useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SearchIcon from '@material-ui/icons/Search';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 0,
    position: 'fixed',
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // const [first, setFirst] = useState(true);

  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
    if (value === 0) history.push('/');
     if (value === 1) history.push('/movies');
    else if (value === 2) history.push('/tv-series');
    else if (value === 3) history.push('/search');
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        // setFirst(false);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Trending" icon={<WhatshotIcon />}  />
      <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction label="TV Series" icon={<LiveTvIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}

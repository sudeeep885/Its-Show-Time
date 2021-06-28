import { Typography } from '@material-ui/core';
import { instanceTMD, instanceBE } from '../../config/axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import SingleContent from '../../components/SingleContent/SingleContent';

const WatchlistView = ({setLoginDetail}) => {

    const [content, setContent] = useState([]);
    const history = useHistory();

    const getData = async () => {
        await instanceBE({
            method: 'GET',
            url: `my-watchlist/`,
            headers: {'Authorization' : `Bearer ${localStorage.getItem('access')}`}
        }).then((response) => {
            let data = response.data;
            data = data ? data.map((d) =>{
              return instanceTMD.get(`${d.media_type_and_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            }) : [];
            Promise.all(data).then((data) => {
              setContent((prevState) => {
                return [...prevState, data];
              })
            })
        }).catch(() => {
          alert('Session expired. Log in again.');
          localStorage.clear();
          setLoginDetail({isAuth: false, user: ''});
          console.log('i was here');
          history.push('/login');
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
      <Typography align='center' gutterBottom variant="h5">MY WATCHLIST</Typography>
      <div className="content-display">
          
        {content[0]?.map((c) => (
          <Link style={{textDecoration: 'none'}} to={(c.data.title ? '/movie/' : '/tv/') + c.data.id}>
          <SingleContent
            key={c.data.id}
            id={c.data.id}
            poster={c.data.poster_path}
            title={c.data.title || c.data.name}
            date={c.data.first_air_date || c.data.release_date}
            media_type={c.data.media_type}
            vote_average={c.data.vote_average}
          />
        </Link>
        ))}
      </div>
    </div>
    )
}

export default WatchlistView

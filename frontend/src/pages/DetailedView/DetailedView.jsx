import { Button, Typography } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Rating from '@material-ui/lab/Rating';
import { instanceTMD, instanceBE } from '../../config/axios';
import AliceCarousel from 'react-alice-carousel';
import React, { useEffect, useState } from 'react'
import { bgURL, img_300, noPicture } from '../../config/config';
import './DetailedView.css';
import { useHistory, useLocation } from 'react-router';

const DetailedView = ({setLoginDetail}) => {

    const location = useLocation();
    const want = location.pathname;
    const [detail, setDetail] = useState([]);
    const [trailerURL, setTrailerURL] = useState();
    const [casts, setCasts] = useState();
    const [crew, setCrew] = useState();
    const [inWatchlist, setInWatchlist] = useState(false);

    const history = useHistory();

    const getDetailedView = async () => {
        await instanceTMD.get(`${want}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then((response) => {
            setDetail(response.data);
        });

        await instanceTMD.get(`${want}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then((response) => {
          setTrailerURL(response.data.results[0]?.key);
        });

        await instanceTMD.get(`${want}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then((response) => {
            setCasts(response.data.cast);
            setCrew(response.data.crew);
        });
    }

    const chechAlreadyInWatchList = async () => {
      await instanceBE({
        method: 'POST',
        url: `my-watchlist/?check=true`,
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access')}`},
        data: {'media_type_and_id' : `${want}`}
      }).then(() => {
        setInWatchlist(true);
      }).catch(() => {});
    }

    useEffect(() => {
        window.scroll(0, 0);
        getDetailedView();
        if(localStorage.getItem('user'))
          chechAlreadyInWatchList();
    }, []);

    const castItems = casts?.map((c) => (
        <div className='carousel-item'>
            <img className='carousel-img'
              src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
              alt={c?.name}
             />
             <Typography variant='subtitle2'>{c?.name}</Typography>
        </div>
    ));

    const crewItems = crew?.map((c) => (
        <div className='carousel-item'>
            <img className='carousel-img'
              src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
              alt={c?.name}
             />
             <Typography variant='subtitle2'>{c?.name}</Typography>
        </div>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const handleAddToWatchlist = async () => {
      await instanceBE({
        method: 'POST',
        url: `my-watchlist/`,
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access')}`},
        data: {'media_type_and_id' : `${want}`}
      }).then(() => {
        setInWatchlist(true);
      }).catch(() => {
        localStorage.clear();
        setLoginDetail({isAuth: false, user: ''});
        history.push('/login');
      });
    }

    const handleRemoveFromWatchlist = async () => {
      await instanceBE({
        method: 'DELETE',
        url: `my-watchlist/`,
        headers: {'Authorization' : `Bearer ${localStorage.getItem('access')}`},
        data: {'media_type_and_id' : `${want}`}
      }).then(() => {
        setInWatchlist(false);
      }).catch(() => {
        alert('Session expired. Log in again.');
        localStorage.clear();
        setLoginDetail({isAuth: false, user: ''});
        history.push('/login');
      });
    }

    return (
        <div>
            <div className='custom-bg' style={{background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${detail.backdrop_path ? bgURL+detail.backdrop_path : null})`}}>
                <div className='banner-content'>
                  <Typography className='banner-heading' display='inline' variant='h2'>{detail.title || detail.name} {detail.tagline && '|'}</Typography>{detail.tagline && <span className='banner-tagline' style={{fontSize: 28, marginLeft: 9}}>{detail.tagline}</span>}
                  <div className='banner-rating'><Rating name="read-only" value={detail.vote_average/2} precision={0.5} readOnly />({detail.vote_count + ' votes'})</div>
                  <Typography className='banner-info' style={{paddingTop: 10}} gutterBottom variant='h6'>{detail.release_date || detail.first_air_date} | {detail.genres && detail.genres.map((e) => e.name).reduce((acc, curr) => (acc + ', ' + curr))} | {detail.runtime ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m` : `${detail.number_of_seasons} Seasons ${detail.number_of_episodes} episodes`}</Typography>
                  <Typography variant='subtitle2'>{detail.overview}</Typography>
                </div>
                <div className='banner-btns'>
                    <Button href={trailerURL? `https://www.youtube.com/watch?v=${trailerURL}` : '#'} style={{margin: 5}} variant='contained' color='secondary'>Watch Trailer<YouTubeIcon fontSize='large' /></Button>
                    {!inWatchlist? <Button style={{margin: 5}} onClick={handleAddToWatchlist} variant='contained' color='primary'>Add to watchlist<PlaylistAddIcon fontSize='large' /></Button> 
                    :
                    <Button style={{margin: 5}} onClick={handleRemoveFromWatchlist} variant='contained' color='primary'>Remove from watchlist<PlaylistAddCheckIcon fontSize='large' /></Button>
                    }
                </div>
            </div>
             
            <div className='separator-1'></div>
            <Typography variant='h3'>Cast</Typography>
            <div className='cast-carousel'>
            <AliceCarousel infinite disableDotsControls responsive={responsive} items={castItems}/>
            </div>
            <div className='separator-2'></div>
            <Typography variant='h3'>Crew</Typography>
            <div className='cast-carousel'>
            <AliceCarousel infinite disableDotsControls responsive={responsive} items={crewItems}/>
            </div>
        </div>
    )
}

export default DetailedView

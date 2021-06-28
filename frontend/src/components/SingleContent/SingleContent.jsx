import { Badge } from "@material-ui/core";
import React from "react";
import {img_300, img_500, unavailable} from '../../config/config';
import './SingleContent.css';

const SingleContent = ({
  id,
  title,
  date,
  media_type,
  poster,
  vote_average,
}) => {



  return (
    <div className='media'>
      <Badge badgeContent={vote_average} color={vote_average>6 ? 'primary' : 'secondary'} />
      <img className='poster' src={poster? `${img_300}/${poster}` : unavailable } />
      <b className='title'>{title}</b>
      <span className='subTitle'>{media_type === 'tv' ? 'TV Series' : 'Movie'}
      <span className='subTitle'>{date}</span>
      </span>
    </div>);
};

export default SingleContent;

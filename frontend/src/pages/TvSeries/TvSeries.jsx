import { instanceTMD } from '../../config/axios';
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from '../../components/Genres/Genres';
import useGenres from "../../hooks/useGenres";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const TvSeries = () => {

  const [content, setContent] = useState({items: [], pageNo: 1});
  const [hasMorePages, setHasMorePages] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const getTvSeries = async (p) => {

    await instanceTMD
      .get(
        `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${p || content.pageNo}&with_genres=${genreforURL}`
      )
      .then((response) => {
        const {results, total_pages} = response.data;
        if(total_pages === content.pageNo) {
          setHasMorePages(false);
        }
        setContent(prevState => {
            return {items: [...prevState.items, ...results], pageNo: prevState.pageNo + 1};
          });
      }).catch((error) => {
        alert(error.response.status + " " + error.response.statusText);
      });
  };

  useEffect(() => {
    setContent({items: [], pageNo: 1});
    getTvSeries(1);
  }, [genreforURL]);


    return (
      <div>
        <Typography align='center' gutterBottom variant="h4">DISCOVER TV SERIES</Typography>
        <Genres type='tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        />
        <InfiniteScroll dataLength={content.items.length} next={getTvSeries} hasMore={hasMorePages}>
        <div className="content-display">
          {content &&
            content.items.map((c) => (
              <Link style={{textDecoration: 'none'}} to={`tv/${c.id}`}>
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.name}
                  date={c.first_air_date}
                  media_type={'tv'}
                  vote_average={c.vote_average}
                />
              </Link>
            ))}
        </div>
        </InfiniteScroll>
      </div>
  );

};

export default TvSeries;

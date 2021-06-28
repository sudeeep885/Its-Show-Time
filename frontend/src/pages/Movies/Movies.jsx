import { instanceTMD } from '../../config/axios';
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from '../../components/Genres/Genres';
import useGenres from "../../hooks/useGenres";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Movies = () => {
  const [content, setContent] = useState({items: [], pageNo: 1});
  const [hasMorePages, setHasMorePages] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);


  const getMovies = async (p) => {
    await instanceTMD
      .get(
        `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${p || content.pageNo}&with_genres=${genreforURL}`
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
    getMovies(1);
  }, [genreforURL]);


  return (
    <div>
      <Typography align='center' gutterBottom variant="h4">DISCOVER MOVIES</Typography>
      <Genres type='movie'
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      genres={genres}
      setGenres={setGenres}
      />
      <InfiniteScroll dataLength={content.items.length} next={getMovies} hasMore={hasMorePages}>
      <div className="content-display">
        {content &&
          content.items.map((c) => (
            <Link style={{textDecoration: 'none'}} to={`movie/${c.id}`}>
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title}
                date={c.release_date}
                media_type={'Movie'}
                vote_average={c.vote_average}
              />
            </Link>
          ))}
      </div>
      </InfiniteScroll>
    </div>
);

};

export default Movies;

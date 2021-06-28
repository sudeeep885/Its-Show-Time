import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Tab, Tabs, Typography } from '@material-ui/core';
import SingleContent from "../../components/SingleContent/SingleContent";
import { instanceTMD } from '../../config/axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const Search = () => {

  const [content, setContent] = useState({items: [], pageNo: 1});
  const [hasMorePages, setHasMorePages] = useState(true);
  const [type, setType] = useState(0);
  const [searchText, setSeatchText] = useState('');

  const getSearch = async (p) => {

    await instanceTMD
      .get(
        `/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${p || content.pageNo}&include_adult=false`
      )
      .then((response) => {
        const {results, total_pages} = response.data;
        if(!total_pages || total_pages === content.pageNo) {
          setHasMorePages(false);
        }
        setContent(prevState => {
            return {items: [...prevState.items, ...results], pageNo: prevState.pageNo + 1};
          });
      }).catch(() => {});
  };

  useEffect(() => {
    window.scroll(0, 0);
    setHasMorePages(true);
    setContent({items: [], pageNo: 1});
    getSearch(1);
  }, [type])

  const handleSearchButton = () => {
    window.scroll(0, 0);
    setHasMorePages(true);
    setContent({items: [], pageNo: 1});
    getSearch(1);
  }

  return (
    <>
    <Typography align='center' gutterBottom variant='h5'>Search Your Favorite Movies/Tv Series</Typography>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <TextField onChange={(e) => setSeatchText(e.target.value)} label="Search" variant="outlined" />
      <Button onClick={handleSearchButton} style={{height: 53, marginLeft: 10}} variant="contained" color="primary"><SearchIcon /></Button>
    </div>

    <Tabs value={type} indicatorColor='primary' variant='fullWidth' onChange={(event, newValue) => {
      setType(newValue);
    }}>
      <Tab label='Movies' />
      <Tab label='TV Series' />
    </Tabs>
    <InfiniteScroll dataLength={content.items.length} next={getSearch} hasMore={hasMorePages}>
        <div className="content-display">
          {content &&
            content.items.map((c) => (
              <Link style={{textDecoration: 'none'}} to={(c.title ? 'movie/' : 'tv/') + c.id}>
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={type ? c.name : c.title}
                  date={type ? c.first_air_date : c.release_date}
                  media_type={type ? 'tv' : 'movie'}
                  vote_average={c.vote_average}
                />
              </Link>
              ))}
        </div>
      </InfiniteScroll>
      {searchText && !hasMorePages && <Typography style={{marginTop: 20}} align='center' variant='h5' >No {type ? 'TV Series' : 'Movies'} Found..</Typography>}
    </>
  )
};

export default Search;

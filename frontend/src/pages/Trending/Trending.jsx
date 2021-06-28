import { Typography } from "@material-ui/core";
import { instanceTMD } from '../../config/axios';
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";

const Trending = () => {
  const [content, setContent] = useState({items: [], pageNo: 1});
  const [hasMorePages, setHasMorePages] = useState(true);

  const getTrending = async () => {
    await instanceTMD.get(`/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${content.pageNo}`
    )
      .then((response) => {
        const {results, total_pages} = response.data;
        if(total_pages === content.pageNo) {
          setHasMorePages(false);
        }
        
        setContent(prevState => {
          return {items: [...prevState.items, ...results], pageNo: prevState.pageNo + 1};
        });
      })
      .catch((error) => {
        alert(error.response.status + " " + error.response.statusText);
      });
  };

  useEffect(() => {
    getTrending();
  }, []);


  return (
    <div>
      <Typography align='center' gutterBottom variant="h4">TRENDING NOW</Typography>
      <InfiniteScroll dataLength={content.items.length} next={getTrending} hasMore={hasMorePages}>
      <div className="content-display">
        {content &&
          content.items.map((c) => (
            <Link style={{textDecoration: 'none'}} to={(c.title ? 'movie/' : 'tv/') + c.id}>
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            </Link>
          ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};

export default Trending;

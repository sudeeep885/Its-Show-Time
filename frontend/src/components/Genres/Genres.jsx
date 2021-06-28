import { Chip } from "@material-ui/core";
import { instanceTMD } from '../../config/axios';
import { useEffect } from "react";
import './Genres.css';

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setGenres([genre, ...genres]);
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
  };

  const getGenres = async () => {
    const { data } = await instanceTMD.get(
      `/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    getGenres();

    return () => {
      setGenres([]);
    };
  }, []);

  return (
    <div className='root'>
      {selectedGenres.map((g) => (
        <Chip
          onDelete={() => handleRemove(g)}
          clickable
          key={g.id}
          label={g.name}
          className='chip'
          style={{backgroundColor: "#801f1f"}}
        />
      ))}
      {genres.map((g) => (
        <Chip
          onClick={() => handleAdd(g)}
          clickable
          key={g.id}
          label={g.name}
          className='chip'
          style={{backgroundColor: "#1f233e"}}
        />
      ))}
    </div>
  );
};

export default Genres;

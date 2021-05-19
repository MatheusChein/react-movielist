import { useContext, useEffect, useState } from "react";

import { Button } from './Button';
import { api } from "../services/api";

import '../styles/sidebar.scss';
import { SelectedGenreContext } from "../contexts/SelectedGenreContext";


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar() {
  // Complete aqui

  const { handleClickButton, selectedGenre } = useContext(SelectedGenreContext)
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}
import { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { api } from '../services/api';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SelectedGenreContextData {
	selectedGenre: GenreResponseProps;
	handleClickButton: (id: number) => void;
	movies: MovieProps[]
}

export const SelectedGenreContext = createContext({} as SelectedGenreContextData);

interface SelectedGenreProviderProps {
	children: ReactNode
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const SelectedGenreProvider = ({children}: SelectedGenreProviderProps) => {
	const [selectedGenreId, setSelectedGenreId] = useState(1);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);


	const handleClickButton = useCallback((id: number) => {
		setSelectedGenreId(id);
	}, [])

	useEffect(() => {
		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
			setSelectedGenre(response.data);
		});

		api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

	}, [selectedGenreId]);

	return (
		<SelectedGenreContext.Provider value={{
				selectedGenre, 
				handleClickButton,
				movies
		}}>
			{children}
		</SelectedGenreContext.Provider>
	)
}
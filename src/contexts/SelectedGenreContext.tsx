import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../services/api';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SelectedGenreContextData {
	selectedGenre: GenreResponseProps;
	handleClickButton: (id: number) => void;
}

export const SelectedGenreContext = createContext({} as SelectedGenreContextData);

interface SelectedGenreProviderProps {
	children: ReactNode
}

export const SelectedGenreProvider = ({children}: SelectedGenreProviderProps) => {
	const [selectedGenreId, setSelectedGenreId] = useState(1);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	useEffect(() => {
		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
			setSelectedGenre(response.data);
		})
	}, [selectedGenreId]);

	return (
		<SelectedGenreContext.Provider value={{
				selectedGenre, 
				handleClickButton
		}}>
			{children}
		</SelectedGenreContext.Provider>
	)
}
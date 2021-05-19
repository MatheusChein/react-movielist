import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { SelectedGenreProvider } from './contexts/SelectedGenreContext';

export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SelectedGenreProvider>
        <SideBar />

        <Content />
      </SelectedGenreProvider>

    </div>
  )
}
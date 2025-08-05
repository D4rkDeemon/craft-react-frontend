import './App.css';
import {Button} from './components/ui/Button';
import { RenderGame as TicTacToe } from './components/TicTacToe/TicTacToe';
import { Navigation } from './components/Navigation/Navigation';
import { Animals } from './components/Animals/Animals';
import { Introduction } from './components/Introduction/Introduction';
import { useState } from 'react';

const pages = [
  {
    handle: 'home',
    label: 'Home',
    component: <Introduction />
  },
  {
    handle: 'animals',
    label: 'Animals',
    component: <Animals />
  },
  {
    handle: 'tictactoe',
    label: 'Play Tic Tac Toe',
    component: <TicTacToe />
  },
]

function App() {
  const [currentPage, setCurrentPage] = useState('home');


  function handlePageChange(page: string) {
    setCurrentPage(page);
  };


  return (
    <div className="App">
      <Navigation currentPage={currentPage} pages={pages} onPageChange={handlePageChange} />

      <div className="App-content">
        {pages.map((page) => (
          currentPage === page.handle && <div key={page.handle}>{page.component}</div>
        ))}
      </div>
    </div>
  );
}




export default App;

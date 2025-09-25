import './bootstrap.min.css';
import './App.css';
import {Button} from './components/ui/Button';
import { RenderGame as TicTacToe } from './components/TicTacToe/TicTacToe';
import { Header } from './components/Header/Header';
import { Animals } from './components/Animals/Animals';
import { Introduction } from './components/Introduction/Introduction';
import { Scroll } from './components/Scroll/Scroll';
import { useState } from 'react';
import { Leaderboard } from './components/Leaderboard/Leaderboard';
import { UltimateFoolery } from './components/UltimateFoolery/UltimateFoolery';

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
  {
    handle: 'scroll',
    label: 'Scroll',
    component: <Scroll />
  },
  {
    handle: 'leaderboard',
    label: 'Leaderboard',
    component: <Leaderboard />
  },
  {
    handle: 'ultimatefoolery',
    label: 'Ultimate Foolery',
    component: <UltimateFoolery />
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  function handlePageChange(page: string) {
    setCurrentPage(page);
  };



  return (
    <div className="App">
      <Header currentPage={currentPage} pages={pages} onPageChange={handlePageChange} />

      <div className="App-content">
        <div className='container'>
          {pages.map((page) => (
            currentPage === page.handle && <div key={page.handle}>
              {page.component}
              </div>
          ))}
        </div>
   
      </div>
    </div>
  );
}

export default App;

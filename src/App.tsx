import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from './components/ui/Button';

const TOKEN = "CvcTgb3odhJpf_sUfn7RU8pOFZardOxO"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <Button onClick={fetchDataFromCraftCMS} text="Fetch Data from Cra123t CMS" />
        <p>
          Data:
        </p>
        <p id="data-container"></p>
      </header>
    </div>
  );
}

function fetchDataFromCraftCMS() {
  const dataContainer = document.getElementById('data-container');

  if (!dataContainer) {
    return;
  }

  dataContainer.textContent = 'Loading...';

  fetch('http://localhost:8080/api', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`  
    },
    body: JSON.stringify({
      query: `{
        entries(section: "animals", orderBy: "id") {
          title
        }
      }`
    })
  })
  .then(response => response.json())
  .then(data => {
    let animals = data["data"]["entries"];
    animals = animals.map((animal: any) => animal.title);

    dataContainer.textContent = JSON.stringify(animals, null, 2);
    }
  );
}

export default App;

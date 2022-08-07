import { useEffect, useState } from 'react';
import Wordle from './components/Wordle'
import './App.css';

function App() {

  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        
        // random number between 0 and 7
        const randomSolution = json[Math.floor(Math.random() * json.length)]

        // update solution
        setSolution(randomSolution.word)

      })
  }, [setSolution]) 


  return (
    <div className="App">
      <h1>Wordle</h1>

      {solution && <Wordle solution={solution}/>}

    </div>
  );
}

export default App;

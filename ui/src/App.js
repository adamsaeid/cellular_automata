import { useEffect } from 'react';
import './App.css';
import init, { elementary_ca } from "cellular_automata";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    
    const CELL_SIZE = 3;
    
    window.initializeCanvas = (size, numGenerations) => {
      canvas.width = CELL_SIZE * size;
      canvas.height = CELL_SIZE * numGenerations;
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    window.drawGeneration = (state, generation) => {
      state.forEach((cellIsActive, index) => {
        if (cellIsActive) {
          context.fillRect(CELL_SIZE * index, CELL_SIZE * generation, CELL_SIZE, CELL_SIZE);
          context.stroke();
        };
      });
    };
  
    init().then(() => {
      window.elementary_ca = elementary_ca;
    
      // display a random rule on page load
      const ruleNumber = Math.floor(Math.random() * 256);
      elementary_ca(ruleNumber, 250, 100);
    });
  }, []);

  return (
    <div className="App">
      <h1>Elementary Cellular Automata</h1>
      <p>Refresh page to view a random rule</p>
      <p>You can also open up the developer console and call elementary_ca(ruleNumber, width, numGenerations) with whatever parameters</p>
      <p><a href="https://mathworld.wolfram.com/ElementaryCellularAutomaton.html">What is an elementary cellular automaton?</a></p>
      <p><a href="https://github.com/adamsaeid/cellular_automata">View code on GitHub</a></p>

      <canvas id="canvas" width="0" height="0">
      </canvas>
    </div>
  );
}

export default App;

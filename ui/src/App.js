import { useEffect } from 'react';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import init, { elementary_ca } from "cellular_automata";
import './App.css';


function App() {
  const ref = useRef();
  const { events } = useDraggable(ref);
 
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    
    const CELL_SIZE = 2;
    
    window.initializeCanvas = (size, numGenerations) => {
      canvas.width = CELL_SIZE * size;
      canvas.height = CELL_SIZE * numGenerations;

      const container = canvas.parentElement;
      const scrollX = (canvas.offsetWidth - container.offsetWidth) / 2;
      container.scrollLeft = scrollX;

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
      // const ruleNumber = Math.floor(Math.random() * 256);
      elementary_ca(30, 2000, 2000);

    });
  }, []);

  return (
    <div
      {...events}
      ref={ref} // add reference and events to the wrapping div

      className="overflow-scroll"
      style={{ overflow: 'scroll', width: '100%', height: '100vh' }}
    >
      <canvas id="canvas" width="0" height="0" style={{display: "block"}}></canvas>
    </div>
  );
}

export default App;

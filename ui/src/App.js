import { useEffect, useRef, useState } from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import '@fontsource/inter';

import init, { elementary_ca } from "cellular_automata";
import RuleSelector from "./components/RuleSelector";

import './App.css';


function App() {
  const draggableRef = useRef();
  const { events } = useDraggable(draggableRef);

  const [ruleSelected, setRuleSelected] = useState(false);

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
    });
  }, []);

  const handleSelectedRule = (rule, size, numGenerations, randomInitialState) => {
    setRuleSelected(true);
    window.elementary_ca(rule, size, numGenerations, randomInitialState);
  }

  return (
    <div
      {...events}
      ref={draggableRef}

      className="overflow-scroll"
      style={{ overflow: 'scroll', width: '100%', height: '100vh' }}
    >
      { !ruleSelected && <RuleSelector onSelection={handleSelectedRule}/> }
      <canvas id="canvas" width="0" height="0" style={{display: "block"}}></canvas>
    </div>
  );
}

export default App;

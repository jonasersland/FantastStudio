import React, { useEffect, useState, useContext } from "react";
import './App.css';

import Cursor from "./Components/Cursor/Cursor.component";
import Frame from './Components/Frame/Frame.component.jsx';
import BackgroundCursorDetector from "./Components/BackgroundCursorDetector/BackgroundCursorDetector.component";
import NavigationFrame from './Components/NavigationFrame/NavigationFrame.component.jsx';

import { MouseContext } from "./Context/mouse-context";

function App() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const [navigationDirection, setNavigationDirection] = useState(0);
  const [cursorContext, setCursorContext] = useState({});

  const handleNavigationChange = (newNavData) => {
    console.log(newNavData);
    setNavigationDirection(newNavData);
    //setClickedItemProps(clickedItemProps);
}

  return (
    <div>
      <Cursor/>
      <Frame navigationDirection={navigationDirection, setCursorContext} />
      <BackgroundCursorDetector />
    </div>
  );
}

export default App;

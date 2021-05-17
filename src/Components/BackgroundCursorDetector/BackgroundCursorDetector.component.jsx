import React, { useContext } from "react";
import "./BackgroundCursorDetector.style.css";
import { MouseContext } from "../../Context/mouse-context";

const BackgroundCursorDetector = () => {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
      <div id='backgroundCursorDetectorWrapper'>
            <div
            onMouseEnter={() => cursorChangeHandler("up")}
            onMouseLeave={() => cursorChangeHandler("")} 
            id="BackgroundCursorDetectorUp">
            </div>

          <div
            onMouseEnter={() => cursorChangeHandler("right")}
            onMouseLeave={() => cursorChangeHandler("")} 
            id="BackgroundCursorDetectorRight">
            </div>

            <div
            onMouseEnter={() => cursorChangeHandler("down")}
            onMouseLeave={() => cursorChangeHandler("")} 
            id="BackgroundCursorDetectorDown">
            </div>

            <div
            onMouseEnter={() => cursorChangeHandler("left")}
            onMouseLeave={() => cursorChangeHandler("")} 
            id="BackgroundCursorDetectorLeft">
            </div>
      </div>

  );
};

export default BackgroundCursorDetector;
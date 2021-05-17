import React, { useContext } from "react";
import "./Cursor.style.css";
import useMousePosition from "../../Hooks/useMousePosition";
import { MouseContext } from "../../Context/mouse-context";

const CustomCursor = () => {

const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const { x, y } = useMousePosition();
  return (
    <>
      <div
        className={"dot " + cursorType}
        style={{ left: `${x}px`, top: `${y}px` }}
      >&rarr;</div>
    </>
  );
};

export default CustomCursor;
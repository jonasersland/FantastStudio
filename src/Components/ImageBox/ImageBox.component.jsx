import React, { useEffect, useState, useCallback, useRef } from "react";
import { animated, useTransition } from 'react-spring';

import './ImageBox.styles.css';

const ImageBox = ({changeZoom}) =>{

    // function handleClick(event) {
    //     const tempCoordinates = {x:50, y:100};
    //     const tempCoordinates = 'value';
    //     changeZoom(tempCoordinates); // pass any argument to the callback
    //   }

    const [coordinates, setCoordinates] = useState(0);
    const inputEl = useRef(null);

    useEffect(() => {
        setCoordinates(inputEl.current.getBoundingClientRect())
    },[]);

    // const returnElementCoordinates = () => {
    //     // const coordinates = inputEl.current.getBoundingClientRect();
    //     // console.log(coordinates);
    //     // return coordinates;
    //     // changeZoom(coordinates);
    //     // console.log(coordinates)
    // };

    //   const [dimensions, setDimensions] = useState(null);

    //   const callBackRef = useCallback(domNode => {
    //     if (domNode) {
    //       setDimensions(domNode.getBoundingClientRect());
    //       console.log(domNode.getBoundingClientRect());
    //     }
    //   }, []);

    //const domRect = getBoundingClientRect();
    // const tempCoordinates = {x:50, y:100};
    return (
        // <div className="ImageBox" onClick={() => changeZoom(tempCoordinates)}>
        <div className="ImageBox" ref={inputEl} onClick={() => changeZoom(coordinates)}>
            box
        </div>
    )
}

export default ImageBox;
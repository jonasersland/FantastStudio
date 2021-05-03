import React, { useEffect, useState } from "react";
import { animated, useTransition, useSpring } from 'react-spring';
import ImageBox from '../ImageBox/ImageBox.component.jsx';
import './Frame.styles.css';
// import { Link } from "react-router-dom";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const widthFactor = -(windowWidth)*0.375;
const heightFactor = -(windowHeight)*0.375;

const Frame = () => {
    const [isZoomedIn, isZoomedInToggle] = useState(false);
    const [zoomCoordinates, setZoomCoordinates] = useState(0);

    const springProps = useSpring({
        transform: zoomCoordinates ? `translate(${zoomCoordinates.x}px, ${zoomCoordinates.y}px) scale(${zoomCoordinates.s})` : `translate(${widthFactor}px, ${heightFactor}px) scale(0.25)`
    })

    const handleChildZoom = (coordinates) => {
        console.log(coordinates)
        //if (!isZoomedIn){
            const topMargin = 50; 
            const xVal = (windowWidth/2) - (coordinates.left*4) - (coordinates.width*2);
            const tempCoordinates = {x: xVal, y: -((coordinates.top*4) - topMargin), s:'1'};
            setZoomCoordinates(tempCoordinates);
            isZoomedInToggle(true);
            console.log(tempCoordinates)
        // } else {
        //     const tempCoordinates = {x: widthFactor, y:heightFactor, s:'0.25'};
        //     setZoomCoordinates(tempCoordinates);
        //     isZoomedInToggle(false);
        // }
    }
    
    return (
        <div>
            <animated.div id="frame" style={springProps}>
                <div className="imageBoxWrapper">
                <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                </div>
                <div className="imageBoxWrapper">
                    <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                </div>
                <div className="imageBoxWrapper">
                <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                    <ImageBox changeZoom={handleChildZoom}/>
                </div>
            </animated.div>
            {/* {transition.map(({ item, key, props }) => (
            item && <animated.div style={props} >Hello world</animated.div>
            ))}

            <button onClick={() => toggle(!on)}>Change</button> */}
        </div>
    )
}

export default Frame;
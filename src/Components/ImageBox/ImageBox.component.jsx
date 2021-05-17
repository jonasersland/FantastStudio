import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {animated,useSpring } from 'react-spring';

import './ImageBox.styles.css';

const ImageBox = ({itemKey, currentImageKey, image, imageSizes, isZoomedIn, zoomCoordinates, setClickedItemProps, width, topMargin, leftMargin}) =>{

    const [imageObscured, toggleImageObscured] = useState(false);
    const [imageExpanded, toggleImageExpanded] = useState(false);
    const [expandedScale, setExpandedScale] = useState(0);
    const [yTransform, setYTransform] = useState(0);

    const expandedHeightOverflow = ((window.innerWidth / image.imageMeta.dimensions.aspectRatio) - window.innerHeight) / 2;
    
    const inputEl = useRef(null);

    // const imageSpringProps = useSpring({
    //     transform: imageExpanded ? `scale(${expandedScale})` : `scale(1)`
    // })

    const expandImageToggle = () =>{
        let s = window.innerWidth / (width*4);
        setExpandedScale(s);
        toggleImageExpanded(!imageExpanded);
    }

    const imageBoxClickHandler = (e) =>{
        if (isZoomedIn && itemKey == currentImageKey){
            //console.log(itemKey, currentImageKey);
            expandImageToggle();
            let yOffset = ((window.innerHeight / 2) - e.clientY) / (window.innerHeight / 2) * expandedHeightOverflow;
            setYTransform(yOffset);
            // clicking currently zoomed in image
        } else{
            //clicking image which is not currently zoomed in
            const clickedItemProps = {
                itemKey: itemKey,
                coordinates: {
                    'width': width,
                    'top': topMargin,
                    'left': leftMargin
                }
            }
            setClickedItemProps(clickedItemProps);
        }
    }

    useEffect(() => {
        if (isZoomedIn && itemKey == currentImageKey){
            toggleImageObscured(false)
        } else if (isZoomedIn && itemKey != currentImageKey){
            toggleImageObscured(true)
        } else {
            toggleImageObscured(false)
        }
    },[zoomCoordinates]);
    
    const logMouse = (y) => {
        if(imageExpanded){
            let yOffset = ((window.innerHeight / 2) - y) / (window.innerHeight / 2) * expandedHeightOverflow;
            setYTransform(yOffset);
        }
    }

    const imageExpandedTransform = useSpring({
        transform: imageExpanded ? `translateY(${yTransform}px) scale(${expandedScale})` : `translateY(0) scale(1)`,
        opacity: imageObscured ? 0 : 1,
        onRest: () => (console.log('rest'))
    })
    //seems to be an issue with the order of when imageExpanded gets set/rendered?
    //maybe that it gets a new class at the same time? try removing class and a different css value on the 'imageExpanded in spring

//TODO: make image display:none  on onRest if it's meant to be obscured

    return (
        <div 
            style={{width: (width*4)}} 
            className={`ImageBox`} 
            ref={inputEl} 
            onMouseMove={({clientY: y }) => logMouse(y)} 
            onClick={(e) => imageBoxClickHandler(e)}>

                <animated.div 
                    className={`imageBoxImageWrapper ${imageExpanded ? 'imageExpanded' : ''}`} 
                    style={imageExpandedTransform}>
{/* let component either expand or become faded out, set to display  */}
                        <img 
                        // style={ { opacity: imageObscured ? '0' : '1' } }
                        className='imageBoxImage' 
                        src={`${image.imageUrl}?h=${isZoomedIn ? imageSizes.fullSizeImageHeightFactor : imageSizes.smallImageHeightFactor}`}/>
                
                </animated.div>
        </div>
    )
}

export default ImageBox;
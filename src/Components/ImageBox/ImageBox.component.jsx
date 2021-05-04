import React, { useEffect, useState, useRef } from "react";

import './ImageBox.styles.css';

const ImageBox = ({itemKey, image, imageSizes, changeZoom, isZoomedIn}) =>{

    const [coordinates, setCoordinates] = useState(0);
    
    const inputEl = useRef(null);

    useEffect(() => {
        const clickedItemProps = {
            itemKey: itemKey,
            coordinates: inputEl.current.getBoundingClientRect()
        }
        setCoordinates(clickedItemProps)
    },[]);

    return (
        <div className="ImageBox" ref={inputEl} onClick={() => changeZoom(coordinates)}>
            <img className="imageBoxImage" src={`${image.imageUrl}?h=${isZoomedIn ? imageSizes.fullSizeImageHeightFactor : imageSizes.smallImageHeightFactor}`}/>
        </div>
    )
}

export default ImageBox;
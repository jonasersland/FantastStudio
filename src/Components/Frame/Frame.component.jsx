import React, { useEffect, useState } from "react";
import { animated, useTransition, useSpring } from 'react-spring';

import sanityClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

import ImageBox from '../ImageBox/ImageBox.component.jsx';
import './Frame.styles.css';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const widthFactor = -(windowWidth)*0.25;
const heightFactor = -(windowHeight)*0.25;

const smallImageHeightFactor = ((windowHeight - 100)/4);
const fullSizeImageHeightFactor = (windowHeight - 100);

const imageSizes = {
    smallImageHeightFactor: Math.round(((windowHeight - 100)/4)),
    fullSizeImageHeightFactor: Math.round((windowHeight - 100))
}

const images = [];

const Frame = () => {
    const [allPostsData, setAllPosts] = useState(null);

    const [isZoomedIn, isZoomedInToggle] = useState(false);
    const [zoomCoordinates, setZoomCoordinates] = useState(0);

    const [currentImageKey, setCurrentImageKey] = useState(0);
    const [clickedItemProps, setClickedItemProps] = useState(0);

    const springProps = useSpring({
        transform: zoomCoordinates ? `translate(${zoomCoordinates.x}px, ${zoomCoordinates.y}px) scale(${zoomCoordinates.s})` : `translate(0px, 0px) scale(0.25)`
    })

    useEffect(() => { 
        sanityClient
          .fetch(
            `*[_type == "project"]{
                title,
                slug,
                "previewProjectImages": workAssets[]{"imageUrl": image.asset->url}
                }
            `
          )
          .then((data) => setAllPosts(data))
          .catch(console.error);
      }, []);

    useEffect(() => {

            if (clickedItemProps){
                const topMargin = 50; 
                const xVal = (windowWidth/2) - (clickedItemProps.coordinates.left*4) - (clickedItemProps.coordinates.width*2);
                const tempCoordinates = {x: xVal, y: -((clickedItemProps.coordinates.top*4) - topMargin), s:'1'};
                setZoomCoordinates(tempCoordinates);
                isZoomedInToggle(true);
                setCurrentImageKey(clickedItemProps.itemKey);
            } else {
                const tempCoordinates = {x: 0, y:0, s:'0.25'};
                setZoomCoordinates(tempCoordinates);
                isZoomedInToggle(false);
                setCurrentImageKey(0);
            }

            console.log(currentImageKey, isZoomedIn);

    },[clickedItemProps]);

    const handleChildZoom = (clickedItemProps) => {
        console.log(allPostsData);
        setClickedItemProps(clickedItemProps);
    }
    
    return (
        <div>
            <animated.div id="frame" style={springProps}>
                {allPostsData &&
                    allPostsData.map((post, index) => (
                        <div key={index} className="imageBoxWrapper">
                            {/* TODO: maybe add function to generate parent key as const, restructure so the next map is _returned_ */}
                            {post.previewProjectImages.map((image,childIndex) => {
                                return(
                                <ImageBox key={image.imageUrl} itemKey={childIndex} image={image} imageSizes={imageSizes} changeZoom={handleChildZoom} isZoomedIn={isZoomedIn}/>
                            )})}
                        </div>
                    ))
                }
            </animated.div>
        </div>
    )
}

export default Frame;
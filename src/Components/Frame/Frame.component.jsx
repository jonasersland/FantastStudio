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

const Frame = ({navigationDirection}) => {
    const [allPostsData, setAllPosts] = useState(null);

    const [isZoomedIn, isZoomedInToggle] = useState(false);
    const [zoomCoordinates, setZoomCoordinates] = useState(0);
    const [layoutCoordinates, setLayoutCoordinates] = useState();

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
                "previewProjectImages": workAssets[]{"imageUrl": image.asset->url, "imageMeta": image.asset->metadata}
                }
            `
          )
          .then((data) => setAllPosts(data))
          .catch(console.error);
      }, []);

    useEffect(() => {
        const layoutCoordinates = [];
        if(allPostsData){
            //console.log(allPostsData);
            for(var i=0;allPostsData.length>i;i++){
                //console.log(allPostsData[i])
                let newRow = [];
                let acc= 0;
                for(var j=0;allPostsData[i].previewProjectImages.length>j;j++){

                    let itemCoordinates = {};

                    itemCoordinates.width = (allPostsData[i].previewProjectImages[j].imageMeta.dimensions.aspectRatio * smallImageHeightFactor);

                    itemCoordinates.top = i * smallImageHeightFactor;

                    if(j==0) itemCoordinates.left = 0;
                    if(j>0)itemCoordinates.left = acc;

                    newRow.push(itemCoordinates);
                    acc = acc + itemCoordinates.width;
                    //console.log(j, itemCoordinates.width, acc);
                }
                layoutCoordinates.push(newRow);
            }
            //console.log(layoutCoordinates);
            setLayoutCoordinates(layoutCoordinates);
        }
    },[allPostsData])

    useEffect(() => {
            if (clickedItemProps){
                const topMargin = 50; 
                const xVal = (windowWidth/2) - (clickedItemProps.coordinates.left*4) - (clickedItemProps.coordinates.width*2);
                const tempCoordinates = {x: xVal, y: -((clickedItemProps.coordinates.top*4) - topMargin), s:'1'};
                setZoomCoordinates(tempCoordinates);
                isZoomedInToggle(true);
                setCurrentImageKey(clickedItemProps.itemKey);
                //console.log(clickedItemProps);
            } else {
                const tempCoordinates = {x: 0, y:0, s:'0.25'};
                setZoomCoordinates(tempCoordinates);
                isZoomedInToggle(false);
                setCurrentImageKey(0);
            }
            //console.log(currentImageKey, isZoomedIn);
    },[clickedItemProps]);

 
    if (!layoutCoordinates) return <div>Loading...</div>;

    return (
        <div>
            <animated.div id="frame" style={springProps}>
                {allPostsData &&
                    allPostsData.map((post, index) => {
                        const parentIndex=index;
                        return(
                        <div key={index} className="imageBoxWrapper">
                            {post.previewProjectImages.map((image,index) => {
                                
                                const width = layoutCoordinates[parentIndex][index].width;
                                const topMargin = layoutCoordinates[parentIndex][index].top;
                                const leftMargin = layoutCoordinates[parentIndex][index].left;
                                //next step, these values probably don't have to be passed through the component but can be as attrbutes
                                return(
                                <ImageBox key={parentIndex.toString() + index.toString()} itemKey={parentIndex.toString() + index.toString()} currentImageKey={currentImageKey} image={image} imageSizes={imageSizes} isZoomedIn={isZoomedIn} zoomCoordinates={zoomCoordinates} setClickedItemProps={setClickedItemProps} width={width} topMargin={topMargin} leftMargin={leftMargin}/>
                            )})}
                        </div>
                        )
                    })
                }
            </animated.div>
        </div>
    )
}

export default Frame;
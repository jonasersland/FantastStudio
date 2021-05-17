import React, { useEffect, useState } from "react";

import './NavigationFrame.style.css';
import Cursor from '../Cursor/Cursor.component.jsx';

const NavigationFrame = ({navigationChange}) =>{

    const [navigationDirection, setNavigationDirection] = useState(0);

    return (
        <div id="navigationFrame">
            <Cursor/>
            {/* <div id="top" onClick={() => navigationChange('up')}></div>
            <div id="right" onClick={() => navigationChange('right')}></div>
            <div id="bottom" onClick={() => navigationChange('down')}></div>
            <div id="left" onClick={() => navigationChange('left')}></div> */}
        </div>
    )
}

export default NavigationFrame;
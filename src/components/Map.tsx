import React, {ReactNode} from 'react';
import "./Map.css";

export interface MapProps {
    children: Array<ReactNode>;
};

function Map(props: MapProps){
    const { children } = props;

    return <div className="map">
        {children}
    </div>;
};

export default Map;
import React, {ReactNode} from 'react';

export interface MapProps {
    children: Array<Array<ReactNode>>;
};

function Map(props: MapProps){
    const matrix = props.children; 

    return <table>
        <tbody>
        {matrix.map((row, rowNum) => 
            <tr key={rowNum}>
                {row.map((cell, cellNum) => 
                <td key={cellNum}>{cell}</td>)}
            </tr>)}
        </tbody>
    </table>;
};

export default Map;
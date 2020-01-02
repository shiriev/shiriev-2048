import * as React from 'react';

export interface MapProps {
    matrix: Array<Array<JSX.Element>>;
};

function Map(props: MapProps){
    const { matrix } = props; 

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
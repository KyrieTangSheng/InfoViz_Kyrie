import React from "react";

export function Cell(props){
    const { dAttr, dTeam, xScale, yScale, color} = props;
    //console.log('dattr:', dAttr)
    return <g transform={`translate(${xScale(dAttr)}, ${yScale(dTeam)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"} />
    </g>
}
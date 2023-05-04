import React from "react";

export function Cell(props){
    const { dAttr, dTeam, xScale, yScale, color} = props;
    return <g transform={`translate(${xScale(dTeam)+80}, ${yScale(dAttr)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"None"} />
    </g>
}

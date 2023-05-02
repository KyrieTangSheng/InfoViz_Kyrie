import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import {
  csv,
  min,
  max,
  median,
  interpolateGnBu,
  interpolateRdBu,
  interpolateYlOrBr,
  mean,
} from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import Papa from "papaparse";

const lplTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/89c13d0e20363745625b391fade85c5cc081d8db/lpl_team.csv";

function useData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {});
      setData(data);
    });
  }, []);
  return dataAll;
}

function getAllTeam(data) {
  const temp = data.map((d) => d.Team);
  return temp;
}

function HeatMap() {
  const WIDTH = 900;
  const HEIGHT = 400;
  const margin = { top: 200, right: 40, bottom: 50, left: 60 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;

  
  const lplTeamData = useData(lplTeamUrl);
  
  if (!lplTeamData) {
    return <pre>Loading...</pre>;
  }
  console.log("lpl team data::...");
  console.log(lplTeamData);
  const LPLTEAM = getAllTeam(lplTeamData);
  console.log(LPLTEAM);
  const TEAMATTR = lplTeamData["columns"].slice(1);
  console.log(TEAMATTR);
  const xScale = Scales.band(TEAMATTR, 0, width);
  const yScale = Scales.band(LPLTEAM, 0, height);
  console.log('test', xScale(TEAMATTR))

  let saturationRange = [
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ];
  console.log("saturation range", saturationRange);

  return (
    <svg width={WIDTH+100} height={HEIGHT+100}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {lplTeamData.map((d, index) => {
          console.log("mapdata:", index, d);
          return Object.keys(d).map((element) => {
            if (TEAMATTR.includes(element)) {
              const colormap = Scales.colorSequential(
                saturationRange[index],
                interpolateYlOrBr
              );
              return (
                <Cell
                  key={element + d.Team}
                  dAttr={element}
                  dTeam={d.Team}
                  xScale={xScale}
                  yScale={yScale}
                  color={colormap(d[element])}
                />
              );
            }
          });
        })}
        {TEAMATTR.map((s) => {
          return (
            <g key={s} transform={`translate(${xScale(s) + 100},-8)rotate(60)`}>
              <text style={{ textAnchor: "end" }}>{s}</text>
            </g>
          );
        })}
        {LPLTEAM.map((m) => {
          return (
            <text key={m} style={{ textAnchor: "middle" }} x={0} y={yScale(m)}>
              {m}
            </text>
          );
        })}
        {/* <Legend
          x={0}
          y={height + 10}
          width={width / 2}
          height={20}
          numberOfTicks={5}
          rangeOfValues={[min(data, (d) => d.start), max(data, (d) => d.start)]}
          colormap={colormap}
        /> */}
      </g>
    </svg>
  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));

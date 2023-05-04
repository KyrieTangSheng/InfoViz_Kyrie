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
import BasicSelect from "./selection"
import DataSorting from "./sorting";
//const lplTeamUrl =
// "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/89c13d0e20363745625b391fade85c5cc081d8db/lpl_team.csv";
const lplTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/636bf006070229d7f59a8a90e5cc14b5218f525d/T_lpl_team.csv";
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

function getAllAttr(data) {
  const temp = data.map((d) => d.Team);
  return temp;
}
function medianArray(arr) {
  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  return median(arr);
}
function HeatMap() {
  const WIDTH = 900;
  const HEIGHT = 700;
  const margin = { top: 200, right: 40, bottom: 50, left: 60 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;

  const [attr, setAttr] = React.useState('GP');

  const [lplTeamData, setLplTeamData] = React.useState(null);
  React.useEffect(()=>{
    async function fetchData() {
      const data = await csv(lplTeamUrl);
      data.forEach((d) => {});
      const sortedData = DataSorting(attr, data);
      setLplTeamData(sortedData);
    }
    fetchData();
  }, [attr]);


  if (!lplTeamData) {
    return <pre>Loading...</pre>;
  }
  let TEAMATTR = getAllAttr(lplTeamData);
  let LPLTEAM = lplTeamData["columns"].slice(1);
  let xScale = Scales.band(LPLTEAM, 0, width);
  let yScale = Scales.band(TEAMATTR, 0, height);


  // const startRange = [min(data, d => d.start), median(data, d => d.start), max(data, d => d.start)];
  // const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];



  return (
    <React.Fragment>
      {<BasicSelect
      attr = {attr}
      setAttr = {setAttr}
      attrList = {TEAMATTR}
        />}
      <svg width={WIDTH+100} height={HEIGHT+100}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {lplTeamData.map((d, index) => {
          console.log("mapped data:",d);
          const sliced_d = Object.keys(d).slice(1).reduce((result, key) => {
            result[key] = parseFloat(d[key]);
            return result;
        }, {});
          return Object.keys(d).map((element) => {
            if (element!="Team") {
              const min_val = min(Object.values(sliced_d));
              const max_val = max(Object.values(sliced_d));
              const median_val = medianArray(Object.values(sliced_d));
              const stat_range = [min_val,median_val,max_val];
              let color_range;
              if(attr!==d.Team){
                color_range = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];
              } else{
                color_range = ["#ffe4e1", "#f7d0cb", "#ba1016"]
              }
              const colormap = Scales.colorSequential(
                // saturationRange[index],
                stat_range,
                color_range
              );

              return (
                <Cell
                  key={element + d.Team}
                  dAttr={d.Team}
                  dTeam={element}
                  xScale={xScale}
                  yScale={yScale}
                  color={colormap(d[element])}

                />
              );
            }
          });
        })}
        {LPLTEAM.map((s) => {
          return (
            <g key={s} transform={`translate(${xScale(s) + 100},-8)rotate(60)`}>
              <text style={{ textAnchor: "end" }}>{s}</text>
            </g>
          );
        })}
        {TEAMATTR.map((m) => {
          return (
            <text key={m} style={{ textAnchor: "middle" }} x={0} y={yScale(m)+15}>
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
    </React.Fragment>


  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));

import React, { useState } from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart({ offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline }) {
  const [hoveredAirlineID, setHoveredAirlineID] = useState(null);

  const maxCount = Math.max(...data.map((d) => d.Count));

  const xScale = scaleLinear()
    .domain([0, maxCount])
    .range([0, width - 60]);

  const yScale = scaleBand()
    .domain(data.map((d) => d.AirlineName))
    .range([0, height])
    .padding(0.2);

  const color = (airlineID) => {
    return airlineID === hoveredAirlineID || airlineID === selectedAirline
      ? '#992a5b' // Highlighted color for selected or hovered airline
      : '#2a5599'; // Default color
  };

  const onMouseOver = (airlineID) => {
    setHoveredAirlineID(airlineID);
    setSelectedAirline(airlineID); // Update selected airline on hover
  };

  const onMouseOut = () => {
    setHoveredAirlineID(null);
  };

  return (
    <g transform={`translate(${offsetX + 60}, ${offsetY})`}>
      <text x={-60} y={-30} textAnchor="start" fontSize="24" fontWeight="bold">
        Airlines
      </text>

      {data.map((d) => (
        <g key={d.AirlineID}>
          <rect
            x={0}
            y={yScale(d.AirlineName)}
            width={xScale(d.Count)}
            height={yScale.bandwidth()}
            fill={color(d.AirlineID)}
            onMouseOver={() => onMouseOver(d.AirlineID)}
            onMouseOut={onMouseOut}
          />
        </g>
      ))}

      <XAxis xScale={xScale} transform={`translate(0, ${height})`} />
      <YAxis yScale={yScale} />
    </g>
  );
}

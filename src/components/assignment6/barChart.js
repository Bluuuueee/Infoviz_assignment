import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;

    // Maximum value for the x scale
    const maximunCount = max(data, d => d.Count);
    const xScale = scaleLinear().range([0, width]).domain([0, maximunCount]).nice();
    const yScale = scaleBand().range([0, height]).domain(data.map(a => a.AirlineName)).padding(0.2); // The domain is the list of airline names

    // Determine bar color based on selection
    const color = (d) => (d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599");

    // Callback for click event to select/unselect the airline
    const onClick = (d) => {
        if (selectedAirline === d.AirlineID) {
            setSelectedAirline(null); // Unselect the airline if it's already selected
        } else {
            setSelectedAirline(d.AirlineID); // Select the clicked airline
        }
    };

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {data.map(d => (
                <rect
                    key={d.AirlineID}
                    x={0}
                    y={yScale(d.AirlineName)}
                    width={xScale(d.Count)}
                    height={yScale.bandwidth()}
                    onClick={() => onClick(d)} // Change to onClick for selection
                    stroke="black"
                    fill={color(d)} // Highlight selected airline
                />
            ))}
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
            <XAxis xScale={xScale} width={width} height={height} />
        </g>
    );
}

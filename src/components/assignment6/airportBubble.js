import React, { useState, useEffect } from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";

function AirportBubble(props) {
    const { width, height, countries, routes, selectedAirline } = props;
    const [citiesData, setCitiesData] = useState([]);
    const [radiusScale, setRadiusScale] = useState(() => () => 2); // Default radius scale

    useEffect(() => {
    // Determine the routes based on selectedAirline
    const selectedRoutes = (selectedAirline !== 'null' && selectedAirline !== null)
        ? routes.filter(a => a.AirlineID === selectedAirline)
        : routes;

    // Group cities and sort by count
    let cities = groupByCity(selectedRoutes).sort((a, b) => a.Count - b.Count);

    // Create radius scale
    const radius = scaleLinear()
        .domain([min(cities, d => d.Count), max(cities, d => d.Count)])
        .range([2, width * 0.15]);

    setRadiusScale(() => radius); // Update radius scale

    // Run force simulation
    const simulation = forceSimulation(cities)
        .velocityDecay(0.2)
        .force("x", forceX(width / 2).strength(0.02))
        .force("y", forceY(height / 2).strength(0.02))
        .force("collide", forceCollide(d => radius(d.Count)))
        .on("tick", () => {
            setCitiesData([...cities]); // Update React state on every tick
        });

    return () => {
        simulation.stop(); // Cleanup simulation on unmount
    };
}, [selectedAirline, routes, width, height]); // Re-run if props change

    if (!citiesData.length) {
        return null; // Avoid rendering until citiesData is populated
    }

    return (
        <svg id="bubble" width={width} height={height}>
            <g>
            {citiesData.map((d, idx) => {
                    const isTop5 = idx >= citiesData.length - 5; // Top 5 cities by count
                    return (
                        <g key={d.City}>
                            <circle
                                cx={d.x}
                                cy={d.y}
                                r={radiusScale(d.Count)} // Use updated radius scale
                                fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                                stroke={"black"}
                                strokeWidth={"2"}
                            />
                            {isTop5 && (
                                <text
                                    x={d.x}
                                    y={d.y}
                                    style={{
                                        textAnchor: "middle",
                                        stroke: "pink",
                                        strokeWidth: "0.5em",
                                        fill: "#992a2a",
                                        fontSize: 16,
                                        fontFamily: "cursive",
                                        paintOrder: "stroke",
                                        strokeLinejoin: "round"
                                    }}
                                >
                                    {d.City}
                                </text>
                            )}
                        </g>
                    );
                })}

            </g>
        </svg>
    );
}

export { AirportBubble }

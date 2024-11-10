import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes';

function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirlineID } = props;
    console.log("selectedAirlineID", selectedAirlineID);
    // Define a Mercator projection
    const projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // Define a path generator using geoPath()
    const path = geoPath().projection(projection);

    return (
        <g>
            {/* world map */}
            {countries.features.map((country, index) => (
                <path
                    key={index}
                    d={path(country)}
                    stroke="#ccc"
                    fill="#eee"
                />
            ))}

            {/* airports */}
            {airports.map((airport, index) => {
                const { Latitude, Longitude } = airport;

                // Project the airport's coordinates onto the map
                const [x, y] = projection([Longitude, Latitude]);

                // Plot each airport as a circle on the map
                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={1}  
                        fill="#2a5599"  
                    />
                );
            })}

            {/* Render routes */}
            <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
        </g>
    );
}

export { AirportMap };

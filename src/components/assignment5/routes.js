import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    // If selectedAirlineID is null, return an empty <g> element
    if (!selectedAirlineID) {
        return <g></g>;
    }

    // Filter the routes for the selected airline
    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);
    console.log("ROUTES:",routes);
    return (
        <g>
            {selectedRoutes.map((route, index) => {
                

                const [sourceX, sourceY] = projection([route.SourceLongitude, route.SourceLatitude]);
                const [destX, destY] = projection([route.DestLongitude, route.DestLatitude]);

                return (
                    <line
                        key={index}
                        x1={sourceX}
                        y1={sourceY}
                        x2={destX}
                        y2={destY}
                        stroke="#992a5b"  // Color for the route line
                        strokeWidth={0.1}
                    />
                );
            })}
        </g>
    );
}

export { Routes };

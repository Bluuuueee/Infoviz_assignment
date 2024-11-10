import React from "react";

export { XAxis, YAxis };
//TODO: complete the YAxis
// 1.Draw the y-axis, using <line>;
// 2.Draw the ticks, using yScale.domain() to get the ticks (i.e., names of airlines);
// For each tick line, we set x1={-5}, x2={0}, y1 and y2 are the half of yScale.bandwidth()
// For the tick text, we set style={{textAnchor: 'start', fontSize:'10px'}}, x={-offsetX+10},y={yScale.bandwidth()/2}
function YAxis(props) {
    const { yScale, height, offsetX } = props;
    return (
        <g transform={`translate(${offsetX}, 0)`}>
            {/* Y-axis line */}
            <line x1={0} y1={0} x2={0} y2={height} stroke="black" />

            {/* Y-axis ticks */}
            {yScale.domain().map((tickValue) => (
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    {/* Tick line */}
                    <line x1={-5} x2={0} y1={yScale.bandwidth() / 2} y2={yScale.bandwidth() / 2} stroke="black" />
                    <line x1={0} y1={0} x2={0} y2={yScale.bandwidth()+5} stroke="black" />
                    {/* Tick label */}
                    <text
                        style={{ textAnchor: "start", fontSize: "10px" }}
                        x={-130} // Position label to the left of the bar
                        y={ yScale.bandwidth() / 2}
                        textAnchor="end"
                        alignmentBaseline="middle" // Align text vertically in the middle of the bar
                        fontSize="14"
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}


function XAxis(props) {
    const { xScale, width, height} = props;
    return <g transform={`translate(${0}, ${height})`}>
        {<line x2={width} stroke='black'/>}
        {xScale.ticks(5).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y1={340} y2={345} stroke='black' />
                <line x1={0} y1={340} x2={30} y2={340} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} x={5} y={355}>
                    {tickValue}
                </text>
            </g>
        )}
    </g>
    
}
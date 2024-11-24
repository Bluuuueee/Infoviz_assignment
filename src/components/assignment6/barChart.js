import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart (props) {
    const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;

    // 获取数据中的最大值，用于设置 X 轴比例尺
    let maximumCount = max(data, d => d.Count);

    // 创建比例尺
    const xScale = scaleLinear()
        .range([0, width])
        .domain([0, maximumCount])
        .nice();
    
    const yScale = scaleBand()
        .range([0, height])
        .domain(data.map(a => a.AirlineName)) // 以航空公司名称作为 Y 轴的域
        .padding(0.2);

    // 条形图的颜色：选中时高亮，否则为默认颜色
    const color = (d) => d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599";

    // 点击条形图的回调函数
    const handleClick = (d) => {
        if (selectedAirline === d.AirlineID) {
            // 如果当前条形图已经选中，则取消选中
            setSelectedAirline(null);
        } else {
            // 否则选中当前条形图
            setSelectedAirline(d.AirlineID);
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
                    onClick={() => handleClick(d)} // 使用 onClick 事件
                    stroke="black"
                    fill={color(d)} // 根据选中状态设置颜色
                />
            ))}
            {/* 绘制坐标轴 */}
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
            <XAxis xScale={xScale} width={width} height={height} />
        </g>
    );
}

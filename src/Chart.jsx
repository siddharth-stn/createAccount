import React from "react";
import * as d3 from "d3";
import { reduce } from "d3";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    dataGenerator () {
        const data = [];
        for (let index = 0; index < 11; index++) {
            const random = Math.floor(Math.random() * 44) + 5;    
            data[index] = random;
        }
        return data
    }
    componentDidMount() {
        const dataset = this.dataGenerator();
        const w = 600;
        const h = 500;
        const svg = d3
            .select(this.myRef.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "bar");
        svg
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("fill", "navy")
            .attr("class", "sBar")
            .attr("x", (d, i) => i * 60)
            .attr("y", (d, i) =>  h - 7 * d)
            .attr("width", 40)
            .attr("height", (d, i) => 7 * d);
        svg
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .style("font-size", 18)
            .attr("fill", "red")
            .attr("x", (d, i) => i * 60)
            .attr("y", (d, i) => h - 7 * d - 3)
            .text(d => d);
    }
    render() {
        const styles = {
            container: {
                display: "grid",
                justifyItems: "center",
                height: "100vh",
            }
        };
        return  <div ref = {this.myRef} style = {styles.container} ></div>
    }
}
export default Chart;
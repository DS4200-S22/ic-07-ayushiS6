const width2 = 900; 
const height2 = 450; 
const margin2 = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset2 = 15; 

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width2-margin2.left-margin2.right)
  .attr("height", height2 - margin2.top - margin2.bottom)
  .attr("viewBox", [0, 0, width2, height2]);


// this sets the tooltip to the div, defines its is attribute, and gives it an opacity style and class attribute
const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

//this eventhandler id defined to display different features of the data from the html in the d3 object
// defined above. It also sets its style with the opacity
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

//this eventhandler defines the lcoation of where the tooltip d3 object should be displayed
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset2) +"px"); 
}

// this eventhandler defins the opacity style for the tooltip d3 object
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}

// code begins here to create the bar chart based on the csv file that is given
d3.csv("data/barchart.csv").then((data) => {

    console.log(data); 

    let maxY2 = d3.max(data, function(d) { return d.score; });

    // TODO: linearly scales the data, sets the domain of the y-axis, and then sets the size of the range 
    let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height2-margin2.bottom,margin2.top]); 

// scales the ordinal data on the x-axis, and sets the domain as the length of the categories,
// it then sets the size of this axis to this length, and includes padding in order to make the 
// positioning better
    let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin2.left, width2 - margin2.right])
            .padding(0.1); 

// append 'g' means to group different svg's together, and this transforms the y-axis to the left
// and then it sets the y-axis to the scaled y-axis from above, and sets the font-size
    svg2.append("g")
        .attr("transform", `translate(${margin2.left}, 0)`) 
        .call(d3.axisLeft(yScale2)) 
        .attr("font-size", '20px'); 

// append 'g' means to group different svg's togehter, and this transforms the x-axis to the bottom
// and then it creates the x-axis's length from the scaling done above, and sets the ticks on the axis as well
// lastly, it sets the font-size again
    svg2.append("g")
        .attr("transform", `translate(0,${height2 - margin2.bottom})`) 
        .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
        .attr("font-size", '20px'); 

/* 

Tooltip Set-up  

*/
  
    svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score))
     .attr("height", (d) => (height2 - margin2.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);
  
  });
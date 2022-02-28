/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// creates the viewBox for the barchart
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// initializes maxY1 to the largest Y value
let maxY1 = d3.max(data1, function(d) { return d.score; });

// linearly scales the data, sets the domain of the y-axis, and then sets the size of the range 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// scales the ordinal data on the x-axis, and sets the domain as the length of the categories,
// it then sets the size of this axis to this length, and includes padding in order to make the 
// positioning better
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// append 'g' means to group different svg's together, and this transforms the y-axis to the left
// and then it sets the y-axis to the scaled y-axis from above, and sets the font-size
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// append 'g' means to group different svg's togehter, and this transforms the x-axis to the bottom
// and then it creates the x-axis's length from the scaling done above, and sets the ticks on the axis as well
// lastly, it sets the font-size again
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// this sets the tooltip to the div, defines its is attribute, and gives it an opacity style and class attribute
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// this eventhandler id defined to display different features of the data from the html in the d3 object
// defined above. It also sets its style with the opacity
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// this eventhandler defines the lcoation of where the tooltip d3 object should be displayed
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// this eventhandler defins the opacity style for the tooltip d3 object
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: this defines the svg bar chart and retrieves its data, which is then appended in the chart
// as a rectangle shape. The attributes are defined for the class bar, and there is a scaling along the
// the x axis which is filled with the x-data or categories, and y axis is filled with the scores for 
// each of the x categories. Then, it defines the height size of the plot and the width size based on the 
// scale sizing done above. Lastly, it links the eventhandlers to the eventlisteners.
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);










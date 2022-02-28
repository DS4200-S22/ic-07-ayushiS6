

// also for the tooltip positionnig, it might be better to use event.pageX and event.pageY

const width3 = 900; 
const height3 = 450; 
const margin3 = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset3 = 15; 

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width3-margin3.left-margin3.right)
  .attr("height", height3 - margin3.top - margin3.bottom)
  .attr("viewBox", [0, 0, width3, height3]);


// this sets the tooltip to the div, defines its is attribute, and gives it an opacity style and class attribute
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

//this eventhandler id defined to display different features of the data from the html in the d3 object
// defined above. It also sets its style with the opacity
const mouseover3 = function(event, d) {
  tooltip3.html("day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

//this eventhandler defines the lcoation of where the tooltip d3 object should be displayed
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset3) +"px"); 
}

// this eventhandler defins the opacity style for the tooltip d3 object
const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0); 
}

// Build your scatterplot in this file 
// code begins here to create the bar chart based on the csv file that is given
d3.csv("data/scatter.csv").then((data3) => {

    console.log(data3); 

    let maxY3 = d3.max(data3, function(d) { return d.score; });

    // linearly scales the data, sets the domain of the y-axis, and then sets the size of the range 
    let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height3-margin3.bottom,margin3.top]); 

// scales the ordinal data on the x-axis, and sets the domain as the length of the categories,
// it then sets the size of this axis to this length, and includes padding in order to make the 
// positioning better
    let xScale3 = d3.scaleBand()
            .domain(d3.range(data3.length))
            .range([margin3.left, width3 - margin3.right])
            .padding(0.1); 

    let xScale4 = d3.scaleLinear()
            .domain([0, d3.max(data3, function(d) { return d; })])
            .range([margin3.left, width3 - margin3.right])


// append 'g' means to group different svg's together, and this transforms the y-axis to the left
// and then it sets the y-axis to the scaled y-axis from above, and sets the font-size
    svg3.append("g")
        .attr("transform", `translate(${margin3.left}, 0)`) 
        .call(d3.axisLeft(yScale3)) 
        .attr("font-size", '20px'); 

// append 'g' means to group different svg's togehter, and this transforms the x-axis to the bottom
// and then it creates the x-axis's length from the scaling done above, and sets the ticks on the axis as well
// lastly, it sets the font-size again
    svg3.append("g")
        .attr("transform", `translate(0,${height3 - margin3.bottom})`) 
        .call(d3.axisBottom(xScale3) 
            .tickFormat(function(d) { return d; })) 
        .attr("font-size", '20px'); 
/* 

Tooltip Set-up  

*/
  
    svg3.selectAll(".scatter") 
   .data(data3) 
   .enter()  
   .append("circle") 
     .attr("class", "scatter") 
     .attr("cx", (d,i) => xScale3(i)) 
     .attr("cy", (d) => yScale3(d.score))
     .attr("r", 10)
     .attr("class", "scatter")
     .attr("height", (d) => (height3 - margin3.bottom) - yScale3(d.score)) 
     .attr("width", xScale4)
     .on("mouseover", mouseover3) 
     .on("mousemove", mousemove3)
     .on("mouseleave", mouseleave3);
  
  });








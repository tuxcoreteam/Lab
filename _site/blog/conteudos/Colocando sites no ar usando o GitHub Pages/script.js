var tooltip = d3.selectAll(".tooltip:not(.css)");
var HTMLabsoluteTip = d3.select("div.tooltip.absolute");
var HTMLfixedTip = d3.select("div.tooltip.fixed");
var HTMLmouseTip = d3.select("div.tooltip.mouse");
var SVGexactTip = d3.select("g.tooltip.exact");
var SVGmouseTip = d3.select("g.tooltip.mouse");
/* If this seems like a lot of different variables,
   remember that normally you'd only implement one 
   type of tooltip! */

/* I'm using d3 to add the event handlers to the circles
   and set positioning attributes on the tooltips, but
   you could use JQuery or plain Javascript. */
var circles = d3.select("svg").select("g")
    .selectAll("circle");

    /***** Easy but ugly tooltip *****/ 
circles.append("title")
      .text("Automatic Title Tooltip");

circles.on("mouseover", function () {
        tooltip.style("opacity", "1");
      
        /* You'd normally set the tooltip text
           here, based on data from the  element
           being moused-over; I'm just setting colour. */
        tooltip.style("color", this.getAttribute("fill") );
      /* Note: SVG text is set in CSS to link fill colour to 
         the "color" attribute. */
      
      
        /***** Positioning a tooltip precisely
               over an SVG element *****/ 
        
        /***** For an SVG tooltip *****/ 
        
        //"this" in the context of this function
        //is the element that triggered this event handler
        //which will be one of the circle elements.
        var tooltipParent = SVGexactTip.node().parentNode;
        var matrix = 
                this.getTransformToElement(tooltipParent)
                    .translate(+this.getAttribute("cx"),
                         +this.getAttribute("cy"));
        
        //getTransformToElement returns a matrix
        //representing all translations, rotations, etc.
        //to convert between two coordinate systems.
        //The .translate(x,y) function adds an additional 
        //translation to the centre of the circle.
        
        //the matrix has values a, b, c, d, e, and f
        //we're only interested in e and f
        //which represent the final horizontal and vertical
        //translation between the top left of the svg and 
        //the centre of the circle.
        
        //we get the position of the svg on the page
        //using this.viewportElement to get the SVG
        //and using offsetTop and offsetLeft to get the SVG's
        //position relative to the page.
        SVGexactTip
            .attr("transform", "translate(" + (matrix.e)
                      + "," + (matrix.f-20) + ")");
        
        /***** For an HTML tooltip *****/ 
        
        //for the HTML tooltip, we're not interested in a
        //transformation relative to an internal SVG coordinate
        //system, but relative to the page body
        
        //We can't get that matrix directly,
        //but we can get the conversion to the
        //screen coordinates.
        
        var matrix = this.getScreenCTM()
                .translate(+this.getAttribute("cx"),
                         +this.getAttribute("cy"));
        
        //You can use screen coordinates directly to position
        //a fixed-position tooltip        
        HTMLfixedTip 
            .style("left", 
                   (matrix.e) + "px")
            .style("top",
                   (matrix.f + 3) + "px");
        //The limitation of fixed position is that it won't
        //change when scrolled.
        
        //A better solution is to calculate the position 
        //of the page on the screen to position an 
        //absolute-positioned tooltip:
        HTMLabsoluteTip
            .style("left", 
                   (window.pageXOffset + matrix.e) + "px")
            .style("top",
                   (window.pageYOffset + matrix.f + 30) + "px");
        
    })
    .on("mousemove", function () {
        
        /***** Positioning a tooltip using mouse coordinates *****/ 
      
        /* The code is shorter, but it runs every time
           the mouse moves, so it could slow down other
           processes or animation. */
        
        /***** For an SVG tooltip *****/ 
       
        var mouseCoords = d3.mouse(
            SVGmouseTip.node().parentNode);
        //the d3.mouse() function calculates the mouse
        //position relative to an SVG Element, in that 
        //element's coordinate system 
        //(after transform or viewBox attributes).
        
        //Because we're using the coordinates to position
        //the SVG tooltip, we want the coordinates to be
        //with respect to that element's parent.
        //SVGmouseTip.node() accesses the (first and only)
        //selected element from the saved d3 selection object.
        
        SVGmouseTip
            .attr("transform", "translate("
                  + (mouseCoords[0]-10) + "," 
                  + (mouseCoords[1] - 10) + ")");
        
        /***** For an HTML tooltip *****/ 
      
        //mouse coordinates relative to the page as a whole
        //can be accessed directly from the click event object
        //(which d3 stores as d3.event)
        HTMLmouseTip
            .style("left", Math.max(0, d3.event.pageX - 150) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
    })
    .on("mouseout", function () {
        return tooltip.style("opacity", "0");
    });

var circleGroup = d3.select("g#circle-group");
d3.select("button#wiggle").on("click", function() {
    circleGroup.transition().duration(1000)
        .attr("transform",
              "rotate("+ (20*(Math.random()-0.5)) + ")"
              +"translate(" + (20*(Math.random()-0.5)) +","
              + (20*(Math.random()-0.5)) + ")"
              );
});
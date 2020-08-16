
//get api
const req = new XMLHttpRequest();
req.open("GET","https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",true)
req.send()
req.onload=function(){  //after getting api
    const json = JSON.parse(req.responseText);
    const w=1000;
    const h=700;

    //adding svg to div
    const svg = d3.select(".container-fluid")
                    .append("svg")
                    .attr("width",w)
                    .attr("height",h);

    const tooltip=d3.select(".container-fluid") //tooltip
                    .append("div")
                    .attr("id","tooltip")
    
    const treemap = d3.treemap()            //setting height and width of treemap
                    .size([w-20,h-50]);
    
    const root = d3.hierarchy(json)         //implementing hierarchy datastructure
                    .sum((d)=>d.value)      //sum of children "value" property
                    .sort((x,y)=>y.value-x.value);  //sort it based on bigger value  
    
    treemap(root);  //add x0,y0,x1,y1

    const tiles= svg.selectAll("g")
                .data(root.leaves())
                .enter()
                .append("g")
                .attr("transform",(d)=>"translate("+d.x0+","+d.y0+")");
                   
            tiles.append("rect")        //add rect for every child
                .attr("class","tile")
                .attr("data-name",(d)=>d.data.name)
                .attr("data-category",(d)=>d.data.category)
                .attr("data-value",(d)=>d.value)
                .attr("width",(d)=>d.x1-d.x0)
                .attr("height",(d)=>d.y1-d.y0)
                .style("fill",(d)=>getFillColor(d.data.category))   //get color based on console
                .on("mouseover",(d,i)=>{        //add tooltip on mouse hover
                    tooltip.style("left",event.pageX-410+"px")
                            .style("top",event.pageY-140+"px")
                            .style("display","inline-block")
                            .style("background-color","black")
                            .style("color","white")
                            .style("opacity","0.7")
                            .html("Name: "+d.data.name+
                                    "<br> Console: "+d.data.category+
                                    "<br> Value: "+d.data.value)
                            .attr("data-value",d.data.value)
                })
                .on("mouseout",(d,i)=>{ //remove tooltip after mouse hover
                    tooltip.style("display","none")
                });
                
            tiles.append("text")    //add text to every tile
                .attr("id","game-label")
                .selectAll("tspan")
                .data(d=>d.data.name.split(/(?=[A-Z][^A-Z])/g)) //split names into array
                .enter()
                .append("tspan")
                .attr("font-size","8.5px")
                .attr("x",1.8)
                .attr("y",(d,i)=>10+9*i)
                .text(d=>d);
          
                const legend=svg.append("g")        //adds legend to the svg
                                .attr("id","legend")
                              
                //add different color rect 
                legend.append("rect")
                    .attr("x",w-880)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#009ac7")
            
                legend.append("rect")
                    .attr("x",w-800)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#FFDF00")
                
                
                legend.append("rect")
                    .attr("x",w-720)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#8bac0f")
                
                legend.append("rect")
                    .attr("x",w-620)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#008080")
                
                legend.append("rect")
                    .attr("x",w-520)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#0e7a0d")   

                legend.append("rect")
                    .attr("x",w-360)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#2E6DB4")   
                
                legend.append("rect")
                    .attr("x",w-220)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","orange")
                
                legend.append("rect")
                    .attr("x",w-120)
                    .attr("y",h-39)
                    .attr("class","legend-item")
                    .attr("width",30)
                    .attr("height",17)
                    .style("fill","#b5b6e4")

                //add text for each rect in legend
                legend.append("text")
                    .attr("x",w-876)
                    .attr("y",h-6)
                    .text("Wii")
                
                legend.append("text")
                    .attr("x",w-820)
                    .attr("y",h-6)
                    .text("NES, 2600")

                legend.append("text")
                    .attr("x",w-730)
                    .attr("y",h-6)
                    .text("GB, GBA")
                
                legend.append("text")
                    .attr("x",w-630)
                    .attr("y",h-6)
                    .text("DS, 3DS")
                
                legend.append("text")
                    .attr("x",w-550)
                    .attr("y",h-6)
                    .text("XB, X360, XOne")

                legend.append("text")
                    .attr("x",w-410)
                    .attr("y",h-6)
                    .text("PS3, PS2, PS4, PSP")

                legend.append("text")
                    .attr("x",w-230)
                    .attr("y",h-6)
                    .text("N64, PS")
                
                
                legend.append("text")
                    .attr("x",w-135)
                    .attr("y",h-6)
                    .text("SNES, PC")
}
//returns color based on type of console
const getFillColor=(d)=>{
    if(d=="Wii"){
        return "#009ac7";
    }else if(d=="NES"||d=="2600"){
        return "#FFDF00";
    }else if(d=="GB" || d=="GBA"){
        return "#8bac0f";
    }else if(d=="DS"||d=="3DS"){
        return "#008080";
    }else if(d=="X360"||d=="XB"||d=="XOne"){
        return "#0e7a0d";
    }else if(d=="PS3"||d=="PS2"||d=="PS4"||d=="PSP"){
        return "#2E6DB4";
    }else if(d=="N64"||d=="PS"){
        return "orange";
    }else if (d=="SNES"||d=="PC"){
        return "#b5b6e4";
    }
}
var dropdownMenu = d3.select("#selDataset");

//Add id's to dropdown menu
d3.json("samples.json").then(function(data) {
    data.names.forEach(name=>dropdownMenu.append("option")
        .text(`${name}`)
        .attr("value",name));
});

function updatePage(patient){
    d3.json("samples.json").then(function(data) {
    //Change info/ graphs when a selection is made

        //change demographic info
        var mData=data.metadata.filter(entry => entry.id==patient);
        mData=mData[0];
        console.log(mData);
        var demaInfo = d3.select("#sample-metadata");
        demaInfo.text("");
        Object.entries(mData).forEach(([i,d])=>demaInfo.append("p")
            .text(`${i}: ${d}`));

        //Collect variables for graphs
        var sData=data.samples.filter(entry => entry.id==patient);
        sData=sData[0];
        var values=sData.sample_values;
        var ids=sData.otu_ids.map(entry => String(entry));
        var labels=sData.otu_labels;

        //bar graph
        var trace1 = {
            x:ids.slice(0,10),
            y:values.slice(0,10),
            type:"bar",
            text:labels.slice(0,10)
        };
        var input=[trace1];

        var layout = {
            xaxis:{type:"category",
                    title:"OTU ID"},
            yaxis:{title:"Sample Value"}
        };
          
        Plotly.newPlot("bar", input, layout);

        //Bubble Chart
        trace1 = {
            x: ids,
            y: values,
            mode: 'markers',
            marker: {
              size: values
            },
            text:labels
          };
        input=[trace1];
        
        var layout = {
            xaxis:{title:"OTU ID's"},
            yaxis:{title:"Sample Value"}
          };
        
        Plotly.newPlot("bubble",input,layout);

    });
}

dropdownMenu.on("change",function(){
    updatePage(this.value);
});

//Initilize page
d3.json("samples.json").then(function(data) {
    data.names.forEach(name=>dropdownMenu.append("option")
        .text(`${name}`)
        .attr("value",name));
});
updatePage(940);
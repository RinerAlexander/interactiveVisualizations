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
        mData=data.metadata.filter(entry => entry.id==patient);
        mData=mData[0];
        console.log(mData);
        var demaInfo = d3.select("#sample-metadata");
        demaInfo.text("");
        Object.entries(mData).forEach(([i,d])=>demaInfo.append("p")
            .text(`${i}: ${d}`));

        //bar graph
        sData=data.samples.filter(entry => entry.id==patient);
        sData=sData[0];
        values=sData.sample_values.slice(0,10);
        ids=sData.otu_ids.map(entry => String(entry)).slice(0,10);
        labels=sData.otu_labels.slice(0,10);

        console.log(values,ids);

        trace1 = {
            x:ids,
            y:values,
            type:"bar",
            text:labels
        };
        input=[trace1]

        var layout = {
            title: "'Bar' Chart",
            xaxis:{type:"category"}
        };
          
        Plotly.newPlot("bar", input, layout);

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
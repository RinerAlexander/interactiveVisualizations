d3.json("samples.json").then(function(data) {

    //Add id's to dropdown menu
    var dropdownMenu = d3.select("#selDataset");   
    data.names.forEach(name=>dropdownMenu.append("option")
            .text(`${name}`)
            .attr("value",name));

    //Change info/ graphs when a selection is made
    dropdownMenu.on("change",function(){

        //change demographic info
        mData=data.metadata.filter(entry => entry.id==this.value);
        mData=mData[0];
        console.log(mData);
        var demaInfo = d3.select("#sample-metadata");
        demaInfo.text("");
        Object.entries(mData).forEach(([i,d])=>demaInfo.append("p")
            .text(`${i}: ${d}`));

        //bar graph
        sData=data.samples.filter(entry => entry.id==this.value);
        sData=sData[0];
        values=sData.sample_values;
        ids=sData.otu_ids.map(entry => String(entry));
        labels=sData.otu_labels;

        console.log(values,ids);

        trace1 = {
            x:ids,
            y:values,
            type:"bar"
        };

        input=[trace1]

        var layout = {
            title: "'Bar' Chart",
            xaxis:{type:"category"}
          };
          
        Plotly.newPlot("bar", input, layout);
    });

});


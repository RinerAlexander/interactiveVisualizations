d3.json("samples.json").then(function(data) {
    // console.log(data.names);
    var dropdownMenu = d3.select("#selDataset");
    // dropdownMenu.append("option").text("1");
    // dropdownMenu.append("option").text("2");
    // dropdownMenu.append("option").text("3");
    data.names.forEach(name=>dropdownMenu.append("option")
            .text(`${name}`)
            .attr("value",name));

    dropdownMenu.on("change",function(){
        mData=data.metadata.filter(entry => entry.id==this.value);
        mData=mData[0];
        console.log(mData);
        var demaInfo = d3.select("#sample-metadata");
        Object.entries(mData).forEach(([i,d])=>demaInfo.append("p")
            .text(`${i}: ${d}`));
    });

});


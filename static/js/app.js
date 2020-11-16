d3.json("samples.json").then(function(data) {
    // console.log(data.names);
    var dropdownMenu = d3.select("#selDataset");
    // dropdownMenu.append("option").text("1");
    // dropdownMenu.append("option").text("2");
    // dropdownMenu.append("option").text("3");
    data.names.forEach(name=>dropdownMenu.append("option").text(`${name}`));

    
});


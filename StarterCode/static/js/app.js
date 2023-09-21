const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// d3.json(roadster).then((data) => {
// console.log(data)
// })
d3.json(bellybutton).then(function(data) {
    console.log(data);
  });
// function init() {

//     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");

//     // Use D3 to get sample names and populate the drop-down selector
//     d3.json(roadster).then((data) => {
        
//         // Set a variable for the sample names
//         let samplenames = data.names;

//         // Add  samples to dropdown menu
//         for (let i = 0; i < samplenames.length; i++){
//             selector
//               .append("option")
//               .text(samplenames[i])
//               .property("value", samplenames[i]);
//           };
        // names.forEach((id) => {

        //     // Log the value of id for each iteration of the loop
        //     console.log(id);

        //     dropdownMenu.append("option")
        //     .text(id)
        //     .property("value",id);
        // });

        // Set the first sample from the list
        // let sample_one = names[0];

        // // Log the value of sample_one
        // console.log(sample_one);

        // Build the initial plots
        // buildMetadata(samplenames);
        // buildBarChart(sample_one);
        // buildBubbleChart(sample_one);
        //buildGaugeChart(sample_one);

//     });
// };

// Function that populates metadata info
// function buildMetadata(sample) {

//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {

//         // Retrieve all metadata
//         let metadata = data.metadata;

//         // Filter based on the value of the sample
//         let value = metadata.filter(result => result.id == sample);

//         // Log the array of metadata objects after the have been filtered
//         console.log(value)

//         // Get the first index from the array
//         let valueData = value[0];

//         // Clear out metadata
//         d3.select("#sample-metadata").html("");

//         // Use Object.entries to add each key/value pair to the panel
//         Object.entries(valueData).forEach(([key,value]) => {

//             // Log the individual key/value pairs as they are being appended to the metadata panel
//             console.log(key,value);

//             d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//         });
//     });

// };

function init() {
    let selector = d3.select("#selDataset");
  
      d3.json(bellybutton).then((data) => {
      let samplenames = data.names;
  
      for (let i = 0; i < samplenames.length; i++){
        selector
          .append("option")
          .text(samplenames[i])
          .property("value", samplenames[i]);
      };
  
      let smaple_name = samplenames[0];
      buildCharts(smaple_name);
      buildMetadata(smaple_name);
    });
  }init();

  function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(bellybutton).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(bellybutton).then(function(data) {
    console.log(data);
  });

  function buildMetadata(sample) {
    d3.json(bellybutton).then((data) => {

        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        let valueData = value[0];
        d3.select("#sample-metadata").html("");
        Object.entries(valueData).forEach(([key,value]) => {
        console.log(key,value);

        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function buildCharts(sample) {
  d3.json(bellybutton).then((data) => {

      let sampleInfo = data.samples;
      let value = sampleInfo.filter(result => result.id == sample);
      let valueData = value[0];

      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;
      console.log(otu_ids,otu_labels,sample_values);

      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      let layout = {
          title: "Top 10 OTUs Present"
      };
      Plotly.newPlot("bar", [trace], layout)
  });
};

function init() {
  d3.json(bellybutton).then((data) => {
    let samplenames = data.names;
    let selector = d3.select("#selDataset");

    for (let i = 0; i < samplenames.length; i++){
      selector
        .append("option")
        .text(samplenames[i])
        .property("value", samplenames[i]);
    };
      samplenames.forEach((id) => {
      console.log(id);

      selector.append("option")
      .text(id)
      .property("value",id);
    });

    let sample_name = samplenames[0];
    buildCharts(sample_name);
    buildMetadata(sample_name);
    buildBubbleChart(sample_name);
  });
};
function optionChanged (samplevalue) {
  // console.log(value); 

  buildCharts(samplevalue);
  buildMetadata(samplevalue);
  buildBubbleChart(samplevalue);
};

function buildBubbleChart(sample) {
  d3.json(bellybutton).then((data) => {
      
      let sampleInfo = data.samples;
      let value = sampleInfo.filter(result => result.id == sample);
      let valueData = value[0];

      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;
      console.log(otu_ids,otu_labels,sample_values);
      
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
          }
      };
      let layout = {
          title: "Bacteria Per Sample",
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
      };

      Plotly.newPlot("bubble", [trace1], layout)
  });
};
init();
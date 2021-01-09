import React from "react";
import "../App.css";
import ReactApexChart from "react-apexcharts";

class Graph extends React.Component {
  state = {
    loading: true,
    cases: null,
    deaths: null,
    recovered: null,
  };

  async componentDidMount() {
    const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cases: data.cases, deaths: data.deaths, recovered: data.recovered, loading: false });
    for (const [key, value] of Object.entries(this.state.cases)) {
      console.log(`${key}: ${value}`);
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    function getValue(item) {
      return Object.values(item);
    }

    var series = [
      {
        name: "Cases",
        data: [],
      },
      {
        name: "Recovered",
        data: [],
      },
      {
        name: "Deaths",
        data: [],
      },
    ];

    series[0].data = Object.entries(this.state.cases).map(getValue);

    series[2].data = Object.entries(this.state.deaths).map(getValue);

    series[1].data = Object.entries(this.state.recovered).map(getValue);  

    var options = {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    };

    options.xaxis.categories = Object.entries(this.state.cases).map((item) => {return Object.keys(item)});

    return (
      <div
        style={{
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <br />
        <h2>COVID-19 Global Graphs</h2>
        <br />
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
        <br />
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}



export default Graph;

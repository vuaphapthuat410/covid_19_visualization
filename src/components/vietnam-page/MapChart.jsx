import React from "react";
import { GET_PROVINCE_STATUS } from "../../plugins/api";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// const dataMap = require("../utils/constant/datamap.json");
// disease.sh/v3/covid-19/gov/Vietnam
// https: console.log(Object.keys(dataMap["data"]));

const vietnamGeoUrl =
  "https://gist.githubusercontent.com/ducviet00/8579f12cb115ac785dd607caf2f4484c/raw/54059af9206563da497212c76e3eb3a329e3eb47/gadm36_VNM_1.json";

const paracelIslandGeoUrl =
  "https://gist.githubusercontent.com/ducviet00/6d7dae417171766abfb5fe26a89e486f/raw/f43ef91c024436dd534dd09c5b04c02da8459267/paracelIslandGeo.json";

const spralyIslandGeoUrl =
  "https://gist.githubusercontent.com/ducviet00/3ca82358b00475fa5b92309c2d66025b/raw/b7396365e59c9f8454848954b82aa9b4bb00d877/spralyIslandGeo.json";

const vietnam = [vietnamGeoUrl, paracelIslandGeoUrl, spralyIslandGeoUrl];

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMap: {},
      isLoaded: true
    };
  }
  setColor(key) {
    // console.log("NAME:", key);
    var cases;
    if (Object.keys(this.state.dataMap).includes(key))
      cases = this.state.dataMap[key]["cases"];
    else return "#D1DBE8";
    if (cases < 5) return "#ADB5C6";
    else if (cases < 10) return "#9BA2B5 ";
    else if (cases < 20) return "#888FA4";
    else if (cases < 50) return "#636982";
    else return "#3E425F";
  }
  componentDidMount() {
    fetch(GET_PROVINCE_STATUS).then(async (response) => {
      let jsonResult = await response.json();
      let result = {};
      for (let item of jsonResult) {
        result[item.city] = item;
      }
      // console.log("ressss", result)
      this.setState({
        dataMap: result,
        isLoaded: false,
      });
    });
  }

  render() {
    const {isLoaded, dataMap } = this.state;
    // console.log("data sasdhasidhasd", GET_PROVINCE_STATUS);
    return (
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          scale: 3000,
          center: [108, 16],
        }}
        style={{
          width: "100%",
          height: "95vh",
        }}
      >
        <ZoomableGroup>
          {vietnam.map((geoUrl) => this.geoGraph(geoUrl))}
        </ZoomableGroup>
      </ComposableMap>
    );
  }

  geoGraph(geoUrl) {
    const { isLoaded, dataMap } = this.state;
    return (
      <Geographies key={geoUrl} geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            var { NAME_1 } = geo.properties;
            // console.log(NAME_1)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  // console.log("inside if", dataMap[NAME_1])
                  let caseNums = 0,
                    death = 0,
                    recovered = 0;
                  if (Object.keys(dataMap).includes(NAME_1)) {
                    caseNums = dataMap[NAME_1]["cases"];
                    death = dataMap[NAME_1]["deaths"];
                    recovered = dataMap[NAME_1]["recovered"];
                  }
                  this.props.tooltipContent(NAME_1, caseNums, death, recovered);
                }}
                onMouseLeave={() => {
                  this.props.tooltipContent("");
                }}
                style={{
                  default: {
                    fill: this.setColor(NAME_1),
                    stroke: "#212529",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "#FF3333",
                    stroke: "#212529",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    );
  }
}

export default MapChart;

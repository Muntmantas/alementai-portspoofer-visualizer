import React, { useEffect, useState } from "react";

import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";
import dashboardFinder from "../../apis/dashboardFinder";
import { SContainer } from "../../styles/globalStyles";

import { scaleLinear } from "d3-scale";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
  .domain([0.29, 20])
  .range(["#ffedea", "#ff5233"]);

const Map = () => {

  const [attackByCountry, SetAttackByCountry] = useState([])

   useEffect(() => {
    const fetchData = async () => {
      try { 
          const response = await dashboardFinder.get("/attacks-by-country");
          SetAttackByCountry(response.data.data.attackByCountry);
      } catch (err) {}
     };
    fetchData();
  }, [])

  return(
  <SContainer>
    <ComposableMap
    width={800}
    height={400}
    projectionConfig={{
        rotate:[-10, 0, 0],
        scale: 147
    }}>
      
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {attackByCountry.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = attackByCountry.find((s) => s.country === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(d ? d.number : "#EEE")}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  </SContainer>
  )
      };

export default Map;

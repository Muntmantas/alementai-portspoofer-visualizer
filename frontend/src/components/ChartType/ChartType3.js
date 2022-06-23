import React, { useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { SContainer } from '../../styles/globalStyles';

import dashboardFinder from "../../apis/dashboardFinder";

function ChartType3() {

  const [usernames, setUsernames] = useState([]);

  const fetch_t_count = async () => {
    try { 
        const response = await dashboardFinder.get("/usernames");
        setUsernames(response.data.data.usernames);
    } catch (err) {}
   };

  useEffect(() => {
  fetch_t_count();
  }, []) 

  return (
    <SContainer>
      <LineChart
        width="auto"
        height="auto"
        data={usernames}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid  horizontal="true" vertical="" stroke="#243240"/>
        <XAxis dataKey="name" tick={{fill:"#fff"}}/>
        <YAxis tick={{fill:"#fff"}} />
        <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
        <Line type="monotone" dataKey="Iphone" stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
        
      </LineChart>
  </SContainer>
  );
}

export default ChartType3;
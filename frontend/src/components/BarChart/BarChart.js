import React, {useEffect, useState} from 'react'
import { BarChart, Bar} from 'recharts';
import { SContainer } from '../../styles/globalStyles';

import dashboardFinder from '../../apis/dashboardFinder';

const BarChartType = () => {

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchHeader = async () => {
    try { 
        const response = await dashboardFinder.get("/usernames");
        setUsernames(response.data.data.usernames)       
    } catch (err) {}
   };
    fetchHeader();
  }, []) 

  

  return (
    <SContainer>
        <BarChart width="auto" height="auto" data={usernames}>
          <Bar dataKey="count" fill="#fff" />
        </BarChart>
    </SContainer>
  )
}

export default BarChartType
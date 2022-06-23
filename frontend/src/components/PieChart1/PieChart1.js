import React, {useEffect, useState} from 'react'
import { PieChart, Pie, Cell} from 'recharts';
import { SContainer } from '../../styles/globalStyles';

import dashboardFinder from '../../apis/dashboardFinder';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart1 = () =>  {

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchHeader = async () => {
      try { 
          const response = await dashboardFinder.get("/usernames");
          setUsernames(response.data.data.usernames);
      } catch (err) {}
     };
    fetchHeader();
  }, []) 


    return (
      <SContainer>
          <PieChart width="auto" height="auto" >
        <Pie
          data={usernames}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={usernames.count}
        >
          {usernames.map((name, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </SContainer>
    ); 
}

export default PieChart1

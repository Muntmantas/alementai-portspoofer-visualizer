import React from 'react';

//import ChartType1 from '../components/ChartType/ChartType1';
//import ChartType2 from '../components/ChartType/ChartType2';
//import ChartType3 from '../components/ChartType/ChartType3';
//import BarChartType from '../components/BarChart/BarChart';
//import PieChart1 from '../components/PieChart1/PieChart1';

import { SGrid } from '../styles/globalStyles';

      //components to not work, data is gone after set.
      //<ChartType1/>
      //<BarChartType/>
      //<ChartType2/>
      //<ChartType3/>
      //<PieChart1/>


const Diagrams = () => {
  return (
    <SGrid>
      <div className="grid">
        <div className='row__one'>
            <h2>Diagrams</h2>
        </div>
        <div className="row__three">
        </div>
      </div>
    </SGrid>
  );
}

export default Diagrams
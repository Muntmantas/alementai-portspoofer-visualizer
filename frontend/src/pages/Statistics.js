import React from 'react'
import AttackerStats from '../components/Stats/AttackerStats';

import {SGrid} from '../styles/globalStyles';

const Statistics = () => {
  
  return (
    <SGrid>
       <div className="grid">
        <div className='row__one'>
            <h2>Statistics</h2>
        </div>
        <div className="row__row">
            <AttackerStats/>
        </div>
      </div>
    </SGrid>
  )
}

export default Statistics



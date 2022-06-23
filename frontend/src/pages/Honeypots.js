import React from 'react'
import HoneypotList from '../components/Honeypots/HoneypotList'
import { HoneypotContextProvider } from '../context/HoneypotContext';

import { SGrid } from '../styles/globalStyles';

const Honeypots = () => {
    
  return (
  <SGrid>
      <div className="grid">
        <div className='row__one'>
            <h2>Honeypots</h2>
        </div>
        <div className="row__row">
            <HoneypotContextProvider>
              <HoneypotList/>
            </HoneypotContextProvider>
        </div>
      </div>
    </SGrid>
  )
}

export default Honeypots
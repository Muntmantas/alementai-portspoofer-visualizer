import React from 'react'

import Carddeck from '../components/Carddeck/Carddeck'
import ListCountries from '../components/ListTypes/ListCountries';
import ListAttacks from '../components/ListTypes/ListAttacks';
import Map from '../components/Map/Map';

import {SGrid} from '../styles/globalStyles';



const Dashboard = () => {
  

  return (
    <SGrid>
      <div className="grid">
        <div className="row__one">
        </div>
        <div className="row__two">
          <Carddeck />
          <Map /> 
        </div>
        <div className="row__three">
          <ListCountries/>
          <ListAttacks/>
        </div>
      </div>
    </SGrid>
    
  )
}

export default Dashboard
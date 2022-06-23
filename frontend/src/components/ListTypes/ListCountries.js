import React, { useState, useEffect } from 'react'
import dashboardFinder from '../../apis/dashboardFinder';
import { H2span, SContainer, ListContainer} from '../../styles/globalStyles'

const ListCountries = () => {
    const [attackByCountry, setAttackByCountry] = useState([]);

     useEffect(() => {

        const fetchData = async () => {
            try { 
                const response = await dashboardFinder.get("/attacks-by-country");
                setAttackByCountry(response.data.data.attackByCountry);  
            } catch (err) {}
           };
         fetchData();
     }, [])
  
  return (
    <SContainer>
    <h4>Attacks by <H2span>COUNTRY</H2span> </h4>
    <hr/>
        <ListContainer>
            <div className='inline'>
                <div className='index'><h4>Index</h4></div>
                <div className='name'><h4>Country</h4></div>
                <div className='count'><h4>Times attacked</h4></div>
            </div>
        </ListContainer>
    {attackByCountry.length > 0 ? (
            <>
            {attackByCountry && attackByCountry.map((attackByCountry, index) => {
                return (
                    <ListContainer key={index} >
                            <div className='inline'>
                                <div className='index'>{index+1}.</div>
                                <div className='name'>{attackByCountry.country ? (
                                <>
                                    {attackByCountry.country}
                                </>      
                                ) : (
                                    <div>*Not known*</div>
                                )}</div>
                                <div className='count'>{attackByCountry.number}</div>
                            </div>
                    </ListContainer>
                )
            })}
            </>
        ) : (
            <div>
                Loading...
            </div>
            )}
  </SContainer>
  )
}

export default ListCountries
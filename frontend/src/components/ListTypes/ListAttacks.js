import React, { useState, useEffect } from 'react'
import dashboardFinder from '../../apis/dashboardFinder';
import { H2span, SContainer, ListContainer} from '../../styles/globalStyles'

const ListAttacks = () => {
    const [attackByHoneypot, setAttackByHoneypot] = useState([]);
    
     useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await dashboardFinder.get("/attacks-by-honeypot");
                setAttackByHoneypot(response.data.data.attackByHoneypot);  
            } catch (err) {}
           };
         fetchData();
     }, [])
  
  return (
    <SContainer>
    <h4>Attacks on <H2span>HONEYPOTS</H2span> </h4>
    <hr/>
        <ListContainer>
            <div className='inline'>
                <div className='index'><h4>Index</h4></div>
                <div className='name'><h4>Honeypot</h4></div>
                <div className='count'><h4>Times attacked</h4></div>
            </div>
        </ListContainer>
    {attackByHoneypot.length > 0 ? (
            <>
            {attackByHoneypot && attackByHoneypot.map((attackByHoneypot, index) => {
                return (
                    <ListContainer key={index} >
                            <div className='inline'>
                                <div className='index'>{index+1}.</div>
                                <div className='name'>{attackByHoneypot.name ? (
                                <>
                                    {attackByHoneypot.name}
                                </>      
                                ) : (
                                    <div>*Not known*</div>
                                )}</div>
                                <div className='count'>{attackByHoneypot.count}</div>
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

export default ListAttacks
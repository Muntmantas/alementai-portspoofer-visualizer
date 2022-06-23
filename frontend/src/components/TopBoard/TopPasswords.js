import React, { useState, useEffect } from 'react'
import dashboardFinder from '../../apis/dashboardFinder';
import { H2span, SContainer, ListContainer} from '../../styles/globalStyles'

const TopPasswords = () => {
    const [passwords, setPasswords] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await dashboardFinder.get("/passwords");
                setPasswords(response.data.data.passwords);  
            } catch (err) {}
           };
        
         fetchData();
     }, [])
  
  return (
    <SContainer>
    <h4>TOP 10 login <H2span>PASSWORDS</H2span> </h4>
    <hr/>
        <ListContainer>
            <div className='inline'>
                <div className='index'><h4>Index</h4></div>
                <div className='name'><h4>Password</h4></div>
                <div className='count'><h4>Times used</h4></div>
            </div>
        </ListContainer>
    {passwords.length > 0 ? (
            <>
            {passwords && passwords.map((password, index) => {
                return (
                    <ListContainer key={index} >
                            <div className='inline'>
                                <div className='index'>{index+1}.</div>
                                <div className='name'>{password.password ? (
                                <>
                                    {password.password}
                                </>      
                                ) : (
                                    <div>*Empty or space*</div>
                                )}</div>
                                <div className='count'>{password.count}</div>
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

export default TopPasswords
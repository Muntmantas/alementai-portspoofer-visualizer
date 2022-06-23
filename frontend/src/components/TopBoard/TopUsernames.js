import React, { useState, useEffect } from 'react'
import dashboardFinder from '../../apis/dashboardFinder';
import { H2span, SContainer, ListContainer} from '../../styles/globalStyles'

const TopUsernames = () => {
  
  const [usernames, setUsernames] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
        try { 
            const response = await dashboardFinder.get("/usernames");
            setUsernames(response.data.data.usernames);  
        } catch (err) {}
       };
       fetchData();
   }, [])

  return (
    <SContainer>
    <h4>TOP 10 login <H2span>USERNAMES</H2span> </h4>
    <hr/>
        <ListContainer>
            <div className='inline'>
                <div className='index'><h4>Index</h4></div>
                <div className='name'><h4>Username</h4></div>
                <div className='count'><h4>Times used</h4></div>
            </div>
        </ListContainer>
    {usernames.length > 0 ? (
            <>
            {usernames && usernames.map((username, index) => {
                return (
                    <ListContainer key={index} >
                            <div className='inline'>
                                <div className='index'>{index+1}.</div>
                                <div className='name'>{username.username ? (
                                <>
                                    {username.username}
                                </>      
                                ) : (
                                    <div>*Empty or space*</div>
                                )}</div>
                                <div className='count'>{username.count}</div>
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

export default TopUsernames
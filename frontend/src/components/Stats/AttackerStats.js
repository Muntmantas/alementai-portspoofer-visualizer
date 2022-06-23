import React, {useEffect, useState} from 'react'

import { SContainer, ListContainer,  H2span} from '../../styles/globalStyles';

import sessionsFinder from '../../apis/sessionsFinder';

const AttackerStats = () => {
   
    const [attackerStats, setAttackerStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await sessionsFinder.get(`/attacker-stats`);
                setAttackerStats(response.data.data.attackerStats);
            } catch (err) {} 
    };
      fetchData();
    }, []) 

    
  
  return (
    <SContainer style={{width:"80vw", height:'auto' }}>
    <div className='header'>
    <h4>Attacker <H2span>STATISTICS</H2span> </h4>
    </div>
    <hr/>
    
        <ListContainer>
            <div className='inline'>
                <div className='index'><h4>Index</h4></div>
                <div className='name'><h4>Attacker IP</h4></div>
                <div className='count'><h4>Number of honeypots in the system where the attacker was caught</h4></div>
                <div className='count'><h4>Overall sessions created by attacker</h4></div>
            </div>
        </ListContainer>
    {attackerStats.length > 0 ? (
            <>
            {attackerStats && attackerStats.map((attackerStats, index) => {
                return (
                    <ListContainer key={index} >
                            <div className='inline'>
                                <div className='index'>{index+1}.</div>
                                <div className='name'>{attackerStats.a_ip ? (
                                <>
                                    {attackerStats.a_ip}
                                </>      
                                ) : (
                                    <div>*Not captured*</div>
                                )}</div>
                                <div className='count'>{attackerStats.honeypotcount}</div>
                                <div className='count'>{attackerStats.sessioncount}</div>
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

export default AttackerStats
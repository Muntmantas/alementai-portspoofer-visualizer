import React, { useState, useEffect } from 'react'
import commandsFinder from '../apis/commandsFinder';
import { SContainer, SGrid } from '../styles/globalStyles';

const Commands = () => {

  const [commands, setCommands] = useState([]);

  const fetchData = async () => {
    try { 
        const response = await commandsFinder.get("");
        setCommands(response.data.data.commands);  
    } catch (err) {}
   };

   useEffect(() => {
       fetchData();
   }, [])

   return (
    <SGrid>
        <div className="grid">
        <div className='row__one'>
            <h2>Commands</h2>
        </div>
        <div className="row__row">
        {commands.length > 0 ? (
            <>
            {commands && commands.map((command, index) => {
                return (
                    <SContainer key={index} >
                          
                        <div className="analytic">
                            <div>
                                <h4>{command.input}</h4>
                            </div>
                        </div>
                            
                    </SContainer>
                )
            })}
            </>
        ) : (
            <SContainer>
                Loading...
            </SContainer>
            )}
        </div>
      </div>
  </SGrid>
);
}

export default Commands


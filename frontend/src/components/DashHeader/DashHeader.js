import React, {useContext, useEffect, useState} from 'react'
import Collapsible from 'react-collapsible';

import {AiOutlineDown} from 'react-icons/ai'

import { HoneypotContext } from '../../context/HoneypotContext';
import honeypotFinder from '../../apis/honeypotFinder';

import { EditButton, SContainer, SGrid, SHeaderContainer} from '../../styles/globalStyles';

const DashHeader = () => {

    const [item, setItem] = useState([]);
    const {honeypots, setHoneypots} = useContext(HoneypotContext);

    useEffect(() => {
        const fetchHeader = async () => {
       try { 
           const response = await honeypotFinder.get("");
           setHoneypots(response.data.data.honeypots);
       } catch (err) {}
      };
      fetchHeader();
  }, []) 
 
    const handleChange = e => {
        const { value, checked } = e.target;
        if (checked) {
          // push selected value in list
          setItem(prev => [...prev, value]);
        } else {
          // remove unchecked value from the list
          setItem(prev => prev.filter(honeypot => honeypot !== value));
        }
      }
      const header = <SHeaderContainer><div>SELECT HONEYPOTS TO DISPLAY THE INFORMATION  <AiOutlineDown size="25px"/></div></SHeaderContainer>;

  return (
     <SContainer>
        <Collapsible trigger={header}>
            <SGrid>
                <div className='grid'>
                    <div className='row__row'>
                        

                {honeypots.length > 0 ? (
                        <>
                        {honeypots && honeypots.map((honeypot, index) => {
                        
                            return (
                                <div className='innerBox' key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="item"
                                            value={honeypot.h_id}
                                            onChange={handleChange}
                                            />                                        
                                                {honeypot.name}
                                    </label>
                                </div>
                            )
                        })}
                        </>
                    ) : (
                        <div>Loading...</div>
                )}
                
                 </div>
                </div>
            </SGrid>
        </Collapsible>
        <br/>
            <div>Selected: {item.length ? item.join(', ') : null}</div>
            <br/>
            <EditButton>Get honeypots</EditButton>      
    </SContainer>
  )
}

export default DashHeader
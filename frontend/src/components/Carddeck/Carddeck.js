import React, {useEffect, useState} from 'react'

import dashboardFinder from '../../apis/dashboardFinder';

import { GiSandsOfTime} from "react-icons/gi";
import { FiCodesandbox} from "react-icons/fi";
import { RiCalendarTodoLine, RiCalendarTodoFill} from "react-icons/ri";
import { SContainer, SSection } from '../../styles/globalStyles';

const Carddeck = () => {

  const [honeypotCount, setHoneypotCount] = useState([]);
  const [todayCount, setTodayCount] = useState([]);
  const [allCount, setAllCount] = useState([]);

  useEffect(() => {
    const fetch_h_count = async () => {
      try { 
          const response = await dashboardFinder.get("/honeypot-count");
          setHoneypotCount(response.data.data.honeypotCount);
      } catch (err) {}
     };
  
     const fetch_t_count = async () => {
      try { 
          const response = await dashboardFinder.get("/today-count");
          setTodayCount(response.data.data.todayCount);
      } catch (err) {}
     };
  
     const fetch_a_count = async () => {
      try { 
          const response = await dashboardFinder.get("/all-count");
          setAllCount(response.data.data.allCount);
      } catch (err) {}
     };
  fetch_h_count();
  fetch_t_count();
  fetch_a_count();
}, []) 

  return (
    <SSection>
      <SContainer>
      <div className="analytic ">
        <div className="content">
          <h5>Active honeypots</h5>
          <h2>{honeypotCount.length > 0 ? (
               <>
               {honeypotCount && honeypotCount.map((honeypotCount, index) => {
                   return (
                    <div key={index}>{honeypotCount.count}</div>  
                   )
               })}
               </>      
                ) : (
                <div>
                    Loading...
                </div>
                )}</h2>
        </div>
        <div className="logo">
          <FiCodesandbox />
        </div>
      </div>
      </SContainer>
      <SContainer>
      <div className="analytic ">
        <div className="content">
          <h5>Login attempts today</h5>
          <h2>{todayCount.length > 0 ? (
               <>
               {todayCount && todayCount.map((todayCountt, index) => {
                   return (
                    <div key={index}>
                      {todayCount.number> 0 ? (
                      <>
                        {todayCount.number}
                      </>      
                       ) : (
                        <div>0</div>
                       )}</div>  
                   )
               })}
               </>      
                ) : (
                <div>
                    Loading...
                </div>
                )}</h2>
        </div>
        <div className="logo">
          <RiCalendarTodoLine />
        </div>
      </div>
      </SContainer>
      <SContainer>
      <div className="analytic ">
        <div className="content">
          <h5>Login attempts all time</h5>
          <h2>{allCount.length > 0 ? (
               <>
               {allCount && allCount.map((allCount, index) => {
                   return (
                    <div key={index}>{allCount.number}</div>  
                   )
               })}
               </>      
                ) : (
                <div>
                    Loading...
                </div>
                )}</h2>
        </div>
        <div className="logo">
          <RiCalendarTodoFill />
        </div>
      </div>
      </SContainer>
      <SContainer>
      <div className="analytic ">
        <div className="content">
          <h5>Data fetch time</h5>
          <h2>Every day</h2>
        </div>
        <div className="logo">
          <GiSandsOfTime />
        </div>
      </div>
      </SContainer>
      </SSection>
  )
}

export default Carddeck
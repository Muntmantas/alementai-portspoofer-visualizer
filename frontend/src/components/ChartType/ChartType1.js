import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import { AreaChart, Area, Tooltip} from "recharts";
import { v } from "../../styles/variables";
import dashboardFinder from "../../apis/dashboardFinder";

export default function ChartType1() {

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetch_t_count = async () => {
   try { 
       const response = await dashboardFinder.get("/usernames");
       setUsernames(response.data.data.usernames);
   } catch (err) {}
  };
  fetch_t_count();
  }, []) 

  return (

    <Section>
      <div className="chart">
          <AreaChart
            width="auto"
            height="auto"
            data={usernames}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Area
              animationBegin={100}
              animationDuration={1000}
              type="monotone"
              dataKey="count"
              stroke="rgb(69,165,136)"
              fill="rgb(89,110,127)"
              strokeWidth={4}
            />
          </AreaChart>
      </div>
    </Section>

  );
}
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  border-radius: ${v.borderRadius};
  background:${({ theme }) => theme.bg3};

  :hover {
        box-shadow: inset 0 0 0 3px ${({ theme }) => theme.bg};
        border-radius: ${v.borderRadius};
    }
  
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: ${({ theme }) => theme.bg2}; //% color
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.2s ease-in-out;
        
        
        &:hover {
          background-color: ${({ theme }) => theme.bg}; //% hover
          span {
            color: ${({ theme }) => theme.text};
          }
        }
        span {
          color: ${({ theme }) => theme.text};
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
    
    }
  }

`;
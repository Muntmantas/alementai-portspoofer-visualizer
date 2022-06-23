import React from 'react'
import { H2span, SContainer, SGrid } from '../styles/globalStyles'
import darkMode from '../assets/darkMode.png'
import navigation from '../assets/navigation.png'

const HomePage = () => {
  return (
    <SGrid>
      <div className="grid">
        <div className="row__one">
          <div>
            <h4>Hello User,</h4>
            <h2>Welcome to 
              <H2span>HONEYPOT VISUALIZER</H2span></h2>
              <div>
              <h3>This is a PBL project. The purpose of this website is to visualize the information provided by the honeypots.</h3>
            </div></div>
              <SContainer>
                <div className='starter'>
                  <div>To navigate press any icon displayed in the navigation bar.</div>
                  <img src={navigation} alt="this is a navigation"/>
                </div>
              </SContainer>
              <SContainer>
              <div className='starter'>
                  <div>Press the toggle button to change the website theme.</div>
                  <img src={darkMode} alt="this is dark mode" />
                </div>
              </SContainer>
      </div>
      </div>
    </SGrid>
  )
}

export default HomePage
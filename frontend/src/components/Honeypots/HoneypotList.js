import React, {useContext, useEffect, useState} from 'react'
import honeypotFinder from '../../apis/honeypotFinder'
import { HoneypotContext } from '../../context/HoneypotContext'
import { EditButton, Modal, SContainer, SContainerList} from '../../styles/globalStyles';
import Popup from 'reactjs-popup';


import { FiCodesandbox } from "react-icons/fi";
import { RiSettings4Line } from "react-icons/ri"
import { AiOutlineInfoCircle} from "react-icons/ai"


import Collapsible from 'react-collapsible';
//import axios from 'axios';

const HoneypotList = (honeypot) => {

    const {honeypots, setHoneypots} = useContext(HoneypotContext);
    const [name, setName] = useState('');
     
    useEffect(() => {
        fetchData();
    }, [honeypots])

    const fetchData = async () => {
        try { 
            const response = await honeypotFinder.get("");
            setHoneypots(response.data.data.honeypots);
        } catch (err) {}
    };

       const editName = async (id) => {
         try {
           const body = { name };
           await fetch(`http://193.219.91.103:5001/honeypots/rename/${id}`, {
             method: "PUT",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(body),
           });
     
         } catch (err) {
           console.error(err.message);
         }
         fetchData();
       };
     
   const header =<h5> Rename <RiSettings4Line/></h5>;
   const headerMain = <h5>Management info <AiOutlineInfoCircle/></h5>;

   return (
        <>
            {honeypots.length > 0 ? (
                <>
                {honeypots && honeypots.map((honeypot, index) => {
                    return (
                        <SContainerList key={index} >
                              
                            <div className="analytic">
                                <div>
                                    <h4>{honeypot.name}</h4>
                                    <h3>{honeypot.h_ip}</h3>
                                    <h5>Port number:  {honeypot.h_port}</h5>
                                </div>
                                <div className="logo">
                                    <FiCodesandbox/>
                                </div>
                            </div>
                            
                                <div className='body'>
                                    
                                    <Collapsible trigger={headerMain}>
                                    <div>IP: {honeypot.mng_ip}</div>
                                    <div>Port: {honeypot.mng_port}</div>  
                                    <div>Log path: {honeypot.log_path}</div>
                                    </Collapsible>
                                    <hr/>
                                    <Popup
                                    trigger={<EditButton className="button"> {header} </EditButton>}
                                        modal
                                        nested
                                        >
                                        {close => (
                                            <>
                                        <SContainer>
                                            <Modal>
                                                <div className="modal">
                                                    <button className="close" onClick={close}>&times;</button>
                                                    <p className="header"> Rename honeypot <h3>( {honeypot.name} )</h3> to: </p>
                                                    <div className="content">
                                                            <EditButton type='button' className='' onClick={() => editName(honeypot.h_id)}>Rename</EditButton>
                                                            <input
                                                                type="text"
                                                                id={honeypot.h_id}
                                                                className="form-control"
                                                                value={name || ''}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                    </div>
                                                </div>
                                            </Modal>
                                        </SContainer>
                                        </>
                                        
                                        )}
                                </Popup>
                                </div>
                        </SContainerList>
                    )
                })}
                </>
            ) : (
                <SContainer>
                    Loading...
                </SContainer>
                )}
        </>
   );
}

export default HoneypotList

import React, {useState, createContext} from "react";

export const HoneypotContext = createContext();

export const HoneypotContextProvider = props => {

    const [honeypots, setHoneypots] = useState([]);

    return (
        <HoneypotContext.Provider value={{honeypots, setHoneypots}}>
            {props.children}
        </HoneypotContext.Provider>
    )
}
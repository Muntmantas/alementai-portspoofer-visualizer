import React, {useState, createContext} from "react";

export const SessionsContext = createContext();

export const SessionsContextProvider = props => {

    const [sessions, setSessions] = useState([]);

    return (
        <SessionsContext.Provider value={{sessions, setSessions}}>
            {props.children}
        </SessionsContext.Provider>
    )
}
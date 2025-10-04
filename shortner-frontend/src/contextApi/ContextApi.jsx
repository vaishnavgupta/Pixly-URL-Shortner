import { createContext, useContext, useState } from "react";

export const ContextApi = createContext();

export const ContextProvider = ({children}) => {
    const getToken = localStorage.getItem("JSON_WEB_TOKEN")
        ?
        JSON.parse(localStorage.getItem("JSON_WEB_TOKEN"))
        :
        null;

    const [token,setToken] = useState(getToken);
    
    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
}

//Making Custom export --> TO Prevent two import in files
export const useStoredContext = () => {
    const context = useContext(ContextApi);
    return context;
}
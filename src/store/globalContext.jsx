import React from "react";

const GlobalContext = React.createContext({
    login: false,
    setLogin: () => { },
    username: '',
    setUsername: () => { }
});

export default GlobalContext;
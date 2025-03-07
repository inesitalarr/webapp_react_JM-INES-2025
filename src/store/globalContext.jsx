import React from "react";

const GlobalContext = React.createContext({
    login: false,
    loginHandler: () => {},
    username: ''
});

export default GlobalContext;
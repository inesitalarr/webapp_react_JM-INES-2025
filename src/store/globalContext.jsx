import React from "react";

const GlobalContext = React.createContext({
    login: false,
    loginHandler: () => {},
    idToken: ''
});

export default GlobalContext;
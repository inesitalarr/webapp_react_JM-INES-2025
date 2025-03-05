import React from "react";

const GlobalContext = React.createContext({
    login: false,
    loginHandler: () => {}
});

export default GlobalContext;
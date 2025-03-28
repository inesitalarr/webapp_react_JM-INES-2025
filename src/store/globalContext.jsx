import React from "react";

const GlobalContext = React.createContext({
    login: false,
    loginHandler: () => {},
    idToken: '',
    uid: '',
    provocarLogout: () => {}
});

export default GlobalContext;
import React from "react";
import AuthContext from "./AuthContext";

function Hello() {
    const authContext = React.useContext(AuthContext);

    return(
        <>
            Hello {authContext}
        </>
    );
}

export default Hello;
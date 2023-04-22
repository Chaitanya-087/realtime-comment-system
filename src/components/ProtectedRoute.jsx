import React from "react";

const ProtectedRoute = ({user, children}) => {
    if (user) return <>{children}</>;
    else {
        return <></>;
    }
};

export default ProtectedRoute;

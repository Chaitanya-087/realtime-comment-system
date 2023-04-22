import { useMemo } from "react";

const useAuth = () => {
    const user = useMemo(() => JSON.parse(localStorage.getItem("user")), [] );
    
    return { user };
};

export default useAuth;

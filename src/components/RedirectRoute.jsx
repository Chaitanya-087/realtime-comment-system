import React, { useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import { authListener } from "../services/firebase-auth";

const RedirectRoute = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubcribe = authListener((authUser) => {
          if (authUser) {
              const {displayName, email, photoURL} = authUser;
              const userObj = {
                  name: displayName ?? email.split("@")[0],
                  photoURL: photoURL ?? null,
                  email,
              };
              setUser(userObj);
              localStorage.setItem("user", JSON.stringify(userObj));
          } else {
              setUser(null);
          }
      });
      return () => {
          unsubcribe();
      };
  }, []);

    if (user) {
        return <Navigate to='/' replace />;
    } else {
        return <>{children}</>;
    }
};

export default RedirectRoute;

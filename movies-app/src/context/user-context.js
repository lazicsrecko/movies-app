import React, { createContext, useState, useEffect, useMemo } from "react";
import { getUserData } from "../services/auth-services";

export const Context = createContext();

const UserContext = (props) => {
  const [currentUser, setCurrentUser] = useState({
    user_id: "",
    firstName: "",
    lastName: "",
  });

  const getCurrentUser = async () => {
    const userData = await getUserData();
    setCurrentUser(userData);
  };

  useEffect(() => {
    getCurrentUser();
    console.log(currentUser);
  }, []);

  const user = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return <Context.Provider value={user}>{props.children}</Context.Provider>;
};

export default UserContext;

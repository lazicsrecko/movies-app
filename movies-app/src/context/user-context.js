import React, { createContext, useState, useMemo } from "react";

export const Context = createContext();

const UserContext = (props) => {
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const user = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return <Context.Provider value={user}>{props.children}</Context.Provider>;
};

export default UserContext;

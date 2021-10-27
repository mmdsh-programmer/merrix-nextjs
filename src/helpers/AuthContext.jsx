import React from "react";

export const AuthContext = React.createContext();

export default function AuthContextProvider(props) {
  const [user, setUser] = React.useState({ rows: [] });

  React.useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

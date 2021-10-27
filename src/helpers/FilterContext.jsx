import React from "react";

export const FilterContext = React.createContext();

export default function FilterContextProvider(props) {
  const [filter, setFilter] = React.useState({
    materials: [],
    sizes: [],
    style: [],
    usage: [],
  });

  return (
    <FilterContext.Provider value={{ filter: filter, setFilter: setFilter }}>
      {props.children}
    </FilterContext.Provider>
  );
}

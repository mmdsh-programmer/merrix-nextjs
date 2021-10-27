import React, { createContext, useReducer } from "react";
import { ProductReducer } from "./ProductReducer";

export const ProductContext = createContext();

const initialState = {
    allProducts: [],
    filteredProducts: [],
};

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const initialProducts = (payload) => {
        dispatch({ type: "SET_PRODUCTS", payload });
    };

    const filtering = (payload) => {
        dispatch({ type: "FILTER_PRODUCTS", payload });
    };

    const contextValues = {
        initialProducts,
        filtering,
        ...state,
    };

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
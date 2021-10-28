import React from "react";
import Header from "./Header";
import BackToTop from "./BackToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "../src/helpers/AuthContext";
import CartContextProvider from "../src/helpers/CartContext";
import FilterContextProvider from "../src/helpers/FilterContext";
import ProductContextProvider from "../src/helpers/ProductContext";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <FilterContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <Header />
              {children}
              <BackToTop />
            </CartContextProvider>
          </ProductContextProvider>
        </FilterContextProvider>
      </AuthContextProvider>
      <ToastContainer bodyClassName="rtl" />
    </>
  );
}

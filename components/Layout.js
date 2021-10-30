import React from "react";
import Header from "./Header";
import BackToTop from "./BackToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "../src/helpers/AuthContext";
import CartContextProvider from "../src/helpers/CartContext";
import FilterContextProvider from "../src/helpers/FilterContext";
import ProductContextProvider from "../src/helpers/ProductContext";
import Loading from "./Loading";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <FilterContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <Loading loading={false} />
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

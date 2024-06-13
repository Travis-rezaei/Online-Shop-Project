import React, { useEffect, useState } from "react";
//Nvbar
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../api/contacts";
//import react icon

//Title Page
import TitlePage from "../TitlePages/TitlePage";

const ShoppingCart = () => {
  const [Product, setProduct] = useState(null);
  const [UpdateNumberP, setUpdateNumberP] = useState(true);
  const [UpdateProduct, setUpdateProduct] = useState(false);

  useEffect(() => {
    Axios.get("/CartProduct").then((Response) => {
      setProduct(Response.data);
      setUpdateNumberP(!UpdateNumberP);
    });
  }, [UpdateProduct]);

  const DeleteOfCart = (id) => {
    Axios.delete(`/CartProduct/${id}`)
      .then(() => {
        setUpdateProduct(!UpdateProduct);
        toast.success("Removed From Cart");
      })
      .catch(() => toast.error("Server error"));
  };

  return (
    <>
      <Navbar UpdateNumberP={UpdateNumberP} />
      <div className="ShoppingCart">
        <TitlePage title="Shopping Cart" />
        <h2>Cart List</h2>
        {Product && (
          <div className="Cart-List">
            <div className="Navigate-Link">
              <Link to={"/"} className="Back-bt btn">
                Back
              </Link>
            </div>

            <div className="Products-List">
              {Product.map((P) => {
                return (
                  <ul key={P.id}>
                    <li>
                      <img src={P.img} alt="Product" />
                    </li>
                    <li>{P.brand}</li>
                    <li>{P.Description}</li>
                    <li>{P.Price}</li>
                    <li>Number : {P.NumberProduct}</li>
                    <button
                      className="btn-D"
                      onClick={() => DeleteOfCart(P.id)}
                    >
                      Delete
                    </button>
                  </ul>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;

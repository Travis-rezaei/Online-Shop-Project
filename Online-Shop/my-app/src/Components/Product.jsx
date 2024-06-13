import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductHoc from "./ProductHoc";
import Axios from "../api/contacts";
//React Icon
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
//Title Page
import TitlePage from "../TitlePages/TitlePage";

const Product = ({ AddNumberProduct, AddedShoppingCard }) => {
  const Params = useParams();
  const [Data, setData] = useState(null);

  useEffect(() => {
    Axios.get(`/Products/${Params.id}`).then((respons) => {
      setData(respons.data);
    });
  }, []);
 

  if (!Data) {
    return (
      <div className="Loader-Box">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <>
      <TitlePage title="Product" />
      <div className="Product container ">
        {Data ? (
          <div className="Products-Container">
            <img src={Data.img} alt="img"></img>
            <div className="P-Description">
              <span>{Data.brand}</span>
              <p>{Data.Description}</p>
              <p>{Data.AboutProduct}</p>
              <h6>{Data.Price}</h6>

              <div className="P-Order">
                <div className="P-Numbers">
                  <GrFormAdd
                    className="Add"
                    onClick={() => AddNumberProduct(Data.id, "+", Data)}
                  />
                  <strong>{Data.NumberProduct}</strong>
                  <GrFormSubtract
                    className="Delete"
                    onClick={() => AddNumberProduct(Data.id, "-", Data)}
                  />
                </div>
                <div className="Shopping-Card">
                  <MdOutlineShoppingCart
                    onClick={() => AddedShoppingCard(Data.id)}
                  />
                </div>
              </div>
              <div className="Back-Page">
                <Link to={"/"} className="Back-bt btn">
                  Back
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductHoc(Product);

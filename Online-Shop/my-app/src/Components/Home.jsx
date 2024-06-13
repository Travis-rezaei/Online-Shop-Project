import React, { useState, useEffect } from "react";
import Axios from "../api/contacts";
import { Link } from "react-router-dom";
//Title Page
import TitlePage from "../TitlePages/TitlePage";
//React icon
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
//Navbar
import Navbar from "./Navbar";
import ProductHoc from "./ProductHoc";

const Home = ({
  UpdateNumberP,
  CloneData,
  setCloneData,
  AddNumberProduct,
  AddedShoppingCard,
}) => {
  const [Data, setData] = useState(null);
  useEffect(() => {
    Axios.get("/Products").then((respons) => {
      setData(respons.data);
      setCloneData(respons.data);
    });
  }, [UpdateNumberP]);

  const FilterProduct = (e) => {
    if (e.target.value === "All") {
      return setData(CloneData);
    }
    const CloneDataItem = CloneData.map((D) => ({ ...D }));
    const FilterResult = CloneDataItem.filter((F) =>
      F.Description.toUpperCase().includes(e.target.value.toUpperCase())
    );
    setData(FilterResult);
  };

  if (!Data) {
    return (
      <div className="Loader-Box">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar UpdateNumberP={UpdateNumberP} FilterProduct={FilterProduct} />
      <TitlePage title="Home" />
      <div className="Home container ">
        <h1>This week's products</h1>
        <div className="Products-List">
          {Data
            ? Data.map((P) => {
                return (
                  <div className="P-Container" key={P.id}>
                    <Link to={`/Product/${P.id}`}>
                      <img src={P.img} alt="img"></img>
                    </Link>
                    <div className="P-Description">
                      <span>{P.brand}</span>
                      <p>{P.Description}</p>
                      <h6>{P.Price}</h6>
                      <div className="P-Order">
                        <div className="P-Numbers">
                          <GrFormAdd
                            className="Add"
                            onClick={() => AddNumberProduct(P.id, "+", P)}
                          />
                          <strong>{P.NumberProduct}</strong>
                          <GrFormSubtract
                            className="Delete"
                            onClick={() => AddNumberProduct(P.id, "-", P)}
                          />
                        </div>
                        <div className="Shopping-Card">
                          <MdOutlineShoppingCart
                            onClick={() => AddedShoppingCard(P.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default ProductHoc(Home);

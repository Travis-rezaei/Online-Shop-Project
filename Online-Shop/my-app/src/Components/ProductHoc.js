import React, { useState } from 'react'
import { toast } from "react-toastify";
import Axios from '../api/contacts'

function ProductHoc(Components) {


    const UpdatedComponent = () => {

        
        const [CloneData, setCloneData] = useState(null);
        const [UpdateNumberP, setUpdateNumberP] = useState(true);


        const AddedShoppingCard = (id) => {
            Axios.get("/CartProduct").then((Answer) => {
                if (Answer.data.length > 0) {
                    const DataRepetitious = Answer.data.some((P) => P.id.includes(id));
                    if (DataRepetitious) {
                        toast.error("This Product is the Cart");
                        return false;
                    }
                }
                Axios.get(`/Products/${id}`)
                    .then((Response) => {
                        Axios.post("/CartProduct", Response.data)
                            .then(() => {
                                toast.success("Added to cart");
                                setUpdateNumberP(!UpdateNumberP);
                            })
                            .catch(() => toast.error("Server error"));
                    })
                    .catch(() => toast.error("error conection"));
            });
        };

        const AddNumberProduct = (id, Operator, ...ProductData) => {
            let ProductObj = ProductData[0];
            Operator === "+"
                ? (ProductObj.NumberProduct += 1)
                : (ProductObj.NumberProduct -= 1);
            Axios.put(`/Products/${id}`, ProductData[0])
                .then(() => {
                    setUpdateNumberP(!UpdateNumberP);
                })
                .catch(() => toast.error("Server error"));
        };


        return (
        <>
        <Components CloneData={CloneData} setCloneData={setCloneData} UpdateNumberP={UpdateNumberP}  AddedShoppingCard={AddedShoppingCard} AddNumberProduct={AddNumberProduct} />
        </>
     )
    }

    return UpdatedComponent

}

export default ProductHoc;
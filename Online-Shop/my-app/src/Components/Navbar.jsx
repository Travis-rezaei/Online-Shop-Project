import { Link } from "react-router-dom";
//import react icon
import { MdOutlineShoppingCart } from "react-icons/md";
import LogoNBar from "../imgs/Logo/shopping.jpg";
import { useEffect, useState } from "react";
//api
import Axios from '../api/contacts'


const Navbar = ({UpdateNumberP,FilterProduct}) => {

  const [Number,setNumber]=useState([]);

  useEffect(()=>{
    Axios.get('/CartProduct')
    .then((response)=>setNumber(response.data))
  },[UpdateNumberP])
  

  return (
    <div className="Navbar">
      <div className="Logo">
        <img src={LogoNBar} alt="Logo" />
      </div>

      <div className="Filter-Product">
        <input type="text" placeholder="Search Product Brand.." onChange={FilterProduct}/>
        <select onChange={FilterProduct}>
          <option value="All">All</option>
          <option value="shirt">shirt</option>
          <option value="tshirt">tshirt</option>
          <option value="shoes">shoes</option>
          <option value="wrist watch">wrist watch</option>
          <option value="pants">pants</option>
        </select>
      </div>

      <div className="Card-Box">
      <Link to={'/ShoppingCart'}>
        <MdOutlineShoppingCart className="Card-Container icon" />
      </Link>
        
        <div className="Number-Product">{Number.length}</div>
      
      </div>
    </div>
  );
};

export default Navbar;

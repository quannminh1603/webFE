import React from "react";
import "./AdidasProductsComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import adidasHome1 from "../../assets/images/adidasHome1.jpg"
import adidasHome2 from "../../assets/images/adidasHome2.jpg"
import adidasHome3 from "../../assets/images/adidasHome3.jpg"
import adidasHome4 from "../../assets/images/adidasHome4.jpg"
import adidasHome5 from "../../assets/images/adidasHome5.jpg"
import adidasHome6 from "../../assets/images/adidasHome6.jpg"
import adidasHome7 from "../../assets/images/adidasHome7.jpg"
import adidasHome8 from "../../assets/images/adidasHome8.jpg"

import Pagination from "@mui/material/Pagination";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
import DanhmucDetail from "../../pages/ProductDetailsPage/DanhmucDetail/DanhmucDetail";

const AdidasProductsComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  }
  return (
    <>
      <article className="product_adidas">
        <div className="slect_product_adidas">
          <div onClick={() => { handleDetailsProduct(id) }} className="product_img_adidas">
            <img alt="example" src={image} />
            <a><FontAwesomeIcon className="cartIcon" icon={faCartPlus} style={{ color: "#fff", }} /></a>
          </div>
          <div className="product_name_adidas">
            <p onClick={() => { handleDetailsProduct(id) }} className="name_adidas">{name}</p>
            {rating}<FontAwesomeIcon icon={faStar} className="starIcon" style={{ color: "#fbff00", }} />
            <div className="price_adidas">{price}<u>đ</u></div>
          </div>
        </div>
      </article>
    </>
  );
}

export default AdidasProductsComponent;
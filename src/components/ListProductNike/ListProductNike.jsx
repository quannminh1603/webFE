// ListProductNike.js
import React from "react";
import "./ListProductNike.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const ListProductNike = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  }

  return (
    <article className="product_nike_custom">
      <div className="slect_product_nike_custom">
        <div onClick={() => {handleDetailsProduct(id)}} className="product_img_nike_custom">
          <img alt="example" src={image} />
          <a><FontAwesomeIcon className="cartIcon_custom" icon={faCartPlus} style={{color: "#fff",}} /></a>
        </div>
        <div className="product_name_nike_custom">
          <p onClick={() => {handleDetailsProduct(id)}} className="name_nike_custom">{name}</p>
          {rating}<FontAwesomeIcon icon={faStar} className="starIcon_custom" style={{color: "#fbff00",}} />
          <div className="price_nike_custom">{price}<u>đ</u></div>
        </div>
      </div>
    </article>
  );
};

export default ListProductNike;

import React from "react";
import "./ListProductAdidas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { StarFilled } from '@ant-design/icons'
// import thumb from "../../assets/images/Rectangle24.png";
// import thumb2 from "../../assets/images/anh1.jpg"
import jordan1 from "../../assets/images/jordan1.jpg"
import jordan2 from "../../assets/images/jordan2.jpg"
import jordan3 from "../../assets/images/jordan3.jpg"
import jordan4 from "../../assets/images/jordan4.jpg"
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const ListProductAdidas = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
  }
  return (
    <article className="product_adidas">
          <div className="slect_product_adidas">
            <div onClick={() => {handleDetailsProduct(id)}} className="product_img_adidas">
              <img alt="example" src={image} />
              <a><FontAwesomeIcon className="cartIcon" icon={faCartPlus} style={{color: "#fff",}} /></a>
            </div>
            <div className="product_name_adidas">
              <p onClick={() => {handleDetailsProduct(id)}} className="name_adidas">{name}</p>
              {rating}<FontAwesomeIcon icon={faStar} className="starIcon" style={{color: "#fbff00",}} />
              <div className="price_adidas">{price}<u>đ</u></div>
            </div>
          </div>
    </article>
      
    
  );
};

export default ListProductAdidas;

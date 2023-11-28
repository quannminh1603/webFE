import React from "react";
import "./AdidasProductsComponent.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import {formatMoney} from '../../utils'
import StarRatingComponent from '../StarRating/StarRatingComponent';

const AdidasProductsComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled, id} = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
    }
    return (
        <>
            <article className="product_adidas col-3">
                <div className="slect_product_adidas">
                    <div onClick={() => {
                        handleDetailsProduct(id)
                    }} className="product_img_adidas">
                        <img alt="example" src={image}/>
                        <a><FontAwesomeIcon className="cartIcon" icon={faCartPlus} style={{color: "#fff",}}/></a>
                    </div>
                    <div className="product_name_adidas">
                        <p onClick={() => {
                            handleDetailsProduct(id)
                        }} className="name_adidas">{name}</p>
                        <div className="rating_adidas">
                            <StarRatingComponent rating={rating}/>
                        </div>
                        <div className="price_adidas">{formatMoney(price)}</div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default AdidasProductsComponent;
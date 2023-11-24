import React from "react";
import "./DanhmucDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const DanhmucDetail = () => {
    return (
        <>
            <div className="register-danhmucDetail">
                <p className="text">Giao hàng miễn phí cho đơn hàng từ 4 triệu trở lên <br /><a href="/sign-up">Đăng kí ngay</a></p>
                
            </div>
            <div className="menuDetail">
                <ul>
                    <li><a href="">Danh mục <FontAwesomeIcon className="icon-down-danhmucDetail" icon={faChevronDown} style={{color: "#000000",}} /></a></li>
                    <li><a href="">Loại sản phẩm <FontAwesomeIcon className="icon-down-danhmucDetail" icon={faChevronDown} style={{color: "#000000",}} /></a></li>
                    <li><a href="">Thương hiệu <FontAwesomeIcon className="icon-down-danhmucDetail" icon={faChevronDown} style={{color: "#000000",}} /></a></li>
                    <li><a href="">Size <FontAwesomeIcon className="icon-down-danhmucDetail" icon={faChevronDown} style={{color: "#000000",}} /></a></li>
                    <li><a href="">Giá tiền <FontAwesomeIcon className="icon-down-danhmucDetail" icon={faChevronDown} style={{color: "#000000",}} /></a></li>
                    {/* <li><a href=""> <FontAwesomeIcon icon={faChevronDown} style={{color: "#000000",}} /></a></li> */}
                </ul>
            </div>
        </>

    );
}

export default DanhmucDetail;
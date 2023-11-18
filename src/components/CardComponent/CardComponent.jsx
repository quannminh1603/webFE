import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell, StyleMountProduct } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const { mount, soLuongConLai, description, hinhAnh, tenSanPham, donGia, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={hinhAnh} />}
            onClick={() =>  handleDetailsProduct(id)}
        >
            <img
                src={logo}
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
            <StyleNameProduct>{tenSanPham}</StyleNameProduct>
            <StyleMountProduct>{mount}</StyleMountProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(donGia)}</span>
                <WrapperDiscountText>
                    - {discount || 5} %
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent
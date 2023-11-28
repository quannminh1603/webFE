import React from 'react'
import './AdidasProducts.css'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'
import AdidasProductsComponent from '../../components/AdidasProductsComponent/AdidasProductsComponent'
import DanhmucDetail from '../ProductDetailsPage/DanhmucDetail/DanhmucDetail'
import Footer from '../../components/FooterComponent/FooterComponent'

const AdidasProducts = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(8)
    const [type, setType] = useState('adidas')
    const [typeProducts, setTypeProducts] = useState([])
  
    const fetchProductAll = async (context) => {
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProduct(search, limit, type)
      return res
  
    }
  
    const fetchAllTypeProduct = async () => {
      const res = await ProductService.getAllTypeProduct()
      if (res?.status === 'OK') {
        setTypeProducts(res?.data)
      }
    }
  
    const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })
  
    useEffect(() => {
      fetchAllTypeProduct()
    }, [])

    return (
        <>
            <Loading isLoading={isLoading || loading}>
                
        <DanhmucDetail />
            <div style={{marginBottom: "80px"}} className="list_product_adidas row">
            <h1>Giày Adidas</h1>
            <div className="list_items_adidas row">
                {products?.data?.map((product) => {
                    return (
                      <AdidasProductsComponent
                        key={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        type={product.type}
                        selled={product.selled}
                        discount={product.discount}
                        id={product._id}
                      />
                    )
                })}
            </div>

          </div>
          <Footer />
            </Loading>
        </>
    )
}

export default AdidasProducts;
// import React from 'react'
// import SliderComponent from '../../components/SliderComponent/SliderComponent'
// import TypeProduct from '../../components/TypeProduct/TypeProduct'
// import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
// import slider1 from '../../assets/images/slider1.webp'
// import slider2 from '../../assets/images/slider2.webp'
// import slider3 from '../../assets/images/slider3.webp'
// import CardComponent from '../../components/CardComponent/CardComponent'
// import { useQuery } from '@tanstack/react-query'
// import * as ProductService from '../../services/ProductService'
// import { useSelector } from 'react-redux'
// import { useState } from 'react'
// import Loading from '../../components/LoadingComponent/Loading'
// import { useDebounce } from '../../hooks/useDebounce'
// import { useEffect } from 'react'

// const HomePage = () => {
//   const searchProduct = useSelector((state) => state?.product?.search)
//   const searchDebounce = useDebounce(searchProduct, 500)
//   const [loading, setLoading] = useState(false)
//   const [limit, setLimit] = useState(6)
//   const [typeProducts, setTypeProducts] = useState([])

//   const fetchProductAll = async (context) => {
//     const limit = context?.queryKey && context?.queryKey[1]
//     const search = context?.queryKey && context?.queryKey[2]
//     const res = await ProductService.getAllProduct(search, limit)

//     return res

//   }

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct()
//     if(res?.status === 'OK') {
//       setTypeProducts(res?.data)
//     }
//   }

//   const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

//   useEffect(() => {
//     fetchAllTypeProduct()
//   }, [])

//   return (
//     <Loading isLoading={isLoading || loading}>
//       <div style={{ width: '1270px', margin: '0 auto' }}>
//         <WrapperTypeProduct>
//           {typeProducts.map((item) => {
//             return (
//               <TypeProduct name={item} key={item}/>
//             )
//           })}
//         </WrapperTypeProduct>
//       </div>
//       <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
//         <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
//           <SliderComponent arrImages={[slider1, slider2, slider3]} />
//           <WrapperProducts>
//             {products?.data?.map((product) => {
//               return (
//                 <CardComponent
//                   key={product._id}
//                   tenSanPham={product.tenSanPham}
//                   mount={product.mount}
//                   soLuongConLai={product.soLuongConLai}
//                   description={product.description}
//                   hinhAnh={product.hinhAnh}
//                   donGia={product.donGia}
//                   rating={product.rating}
//                   size={product.size}
//                   type={product.type}
//                   selled={product.selled}
//                   discount={product.discount}
//                   id={product._id}
//                 />
//               )
//             })}
//           </WrapperProducts>
//           <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//             <WrapperButtonMore
//               textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
//                 border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
//                 width: '240px', height: '38px', borderRadius: '4px'
//               }}
//               disabled={products?.total === products?.data?.length || products?.totalPage === 1}
//               styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
//               onClick={() => setLimit((prev) => prev + 6)}
//             />
//           </div>
//         </div>
//       </div>
//     </Loading>
//   )
// }

// export default HomePage

// test
import React, {useEffect, useState} from 'react'
import * as ProductService from '../../services/ProductService'
import {useSelector} from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import {useDebounce} from '../../hooks/useDebounce'
import Footer from '../../components/FooterComponent/FooterComponent'
import Navbar from '../../components/Navbar/Navbar'
import AboutHomeComponent from '../../components/AboutHomeComponent/AboutHomeComponent'
import ListProductAdidas from '../../components/ListProductAdidas/ListProductAdidas'
import SubBanner from '../../components/SubBanner/SubBanner'
import ListDanhmuc from '../../components/ListDanhMuc/ListDanhMuc'
import ListProductMlb from '../../components/ListProductMlb/ListProductMlb'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(20)
    const [typeProducts, setTypeProducts] = useState([])

    const [productList, setProductList] = useState([]);
    const fetchProductAll = (context) => {
        setLoading(true);
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        ProductService.getAllProduct(search, limit).then((res) => {
            setProductList(res?.data);
            setLoading(false);
        });
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct();
        fetchProductAll({queryKey: ['products', limit, searchDebounce]});
    }, [])

    return (
        <>
        <Loading isLoading={loading}>
            <div className='body'>
                <div id="container">
                    <Navbar/>
                    <AboutHomeComponent/>
                    <div style={{marginBottom: "80px"}} className="list_product_nike">
                        <h1>Giày Nike</h1>
                        <div className="list_items_nike">
                            {productList?.map((product) => {
                                    if (product?.type?.ten === 'Giày Nike') {
                                        return (
                                            <ListProductAdidas
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

                                    }
                                }
                            )}
                    </div>

                </div>
                <div style={{marginBottom: "80px"}} className="list_product_nike">
                    <h1>Giày Adidas</h1>
                    <div className="list_items_adidas">
                        {productList?.map((product) => {
                                if (product?.type?.ten === 'Giày Adidas') {
                                    return (
                                        <ListProductAdidas
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

                                }
                            }
                        )}
                    </div>
                </div>
                <SubBanner/>
                <div style={{marginBottom: "80px"}} className="list_product_nike">
                    <h1>Giày MLB</h1>
                    <div className="list_items_mlb">
                        {productList?.map((product) => {
                            if (product?.type?.ten === 'Giày MLB')
                                return (
                                    <ListProductMlb
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
                <ListDanhmuc/>


                {/* <WrapperProducts>
            {products?.data?.map((product) => {
              if(product.type == "Giày MLB")
              return (
                <CardComponent
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
          </WrapperProducts> */}
                {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div> */}
            </div>
        </div>
        <Footer/>
        </Loading>
</>
)
}

export default HomePage 
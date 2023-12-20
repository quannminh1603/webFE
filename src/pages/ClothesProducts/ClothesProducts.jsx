import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import Footer from '../../components/FooterComponent/FooterComponent';
import ListProductClothes from '../../components/ListProductClothes/ListProductClothes';
import './ClothesProducts.css';

const ClothesProduct = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  // const [type, setType] = useState('Giày MLB');
  const [page, setPage] = useState(1)
  const [typeProducts, setTypeProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState([]);
  // const productsPerPage = 8; {/* set số sp*/}

  const fetchProductAll = async (context) => {
    const limit = context && context.queryKey && context.queryKey[1];
    const search = context && context.queryKey && context.queryKey[2];

    const res = await ProductService.getAllProductByType(search, limit, 'Áo quần thể thao').then((res) => {
      setProductList(res?.data);
      // setLoading(false);
    });

    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res && res.status === 'OK') {
      setTypeProducts(res.data);
    }
  };

  const { isLoading, data: products, isPreviousData } = useQuery(
    ['products', limit, searchDebounce],
    fetchProductAll,
    { retry: 3, retryDelay: 1000, keepPreviousData: true }
  );

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  // const totalPages = Math.ceil((products?.data?.length || 0) / productsPerPage);

  return (
    <>
      <Loading isLoading={isLoading || loading}>
        {/* <DanhmucDetail /> */}
        <div style={{ marginBottom: '80px' }} className="list_product_clothes">
          <h1>Áo quần thể thao</h1>
          <div className="list_items_clothes">
          {productList?.map((product) => (
            <ListProductClothes
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
          ))}
          </div>

          {/* <div className='btnpage'>
            <button
              className={`nav-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
                disabled={index + 1 === currentPage}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`nav-button ${isPreviousData || !products?.data || (currentPage - 1) * productsPerPage + productsPerPage >= products?.data.length }`}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={isPreviousData || !products?.data || (currentPage - 1) * productsPerPage + productsPerPage >= products?.data.length}
            >
              &gt;&gt;
            </button>
          </div> */}
        </div>


        <Footer />
      </Loading>
    </>
  );
};

export default ClothesProduct;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import MlbProductsComponent from '../../components/MlbProductsComponent/MlbProductsComponent';
import DanhmucDetail from '../ProductDetailsPage/DanhmucDetail/DanhmucDetail';
import Footer from '../../components/FooterComponent/FooterComponent';

const MlbProducts = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [type, setType] = useState('Giày Mlb');
  const [typeProducts, setTypeProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; {/* set số sp*/}

  const fetchProductAll = async (context) => {
    const limit = context && context.queryKey && context.queryKey[1];
    const search = context && context.queryKey && context.queryKey[2];

    const res = await ProductService.getAllProduct(search, limit, type);
    const startIdx = (currentPage - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    const displayedProducts = res?.data?.slice(startIdx, endIdx);

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

  const totalPages = Math.ceil((products?.data?.length || 0) / productsPerPage);

  return (
    <>
      <Loading isLoading={isLoading || loading}>
        <DanhmucDetail />
        <div style={{ marginBottom: '80px' }} className="list_product_mlb">
          <h1>Giày MLB</h1>
          <div className="list_items_mlb">
            {products?.data?.slice(
              (currentPage - 1) * productsPerPage,
              (currentPage - 1) * productsPerPage + productsPerPage
            )?.map((product) => (
              <MlbProductsComponent
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

          <div className='btnpage'>
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
          </div>
        </div>


        <Footer />
      </Loading>
    </>
  );
};

export default MlbProducts;

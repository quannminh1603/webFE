import React from 'react'
import './ProductDetailsPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/FooterComponent/FooterComponent'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <>
      <div style={{ width: '100%', background: '#efefef', height: '100%' }}>
        <div style={{ width: '1270px', height: '100%', margin: '0 auto' }} >
          <h5><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm</h5>
          <ProductDetailsComponent idProduct={id} />
        </div>

      </div>
      <div className="comment">
        <input type="text" placeholder="Bình luận về sản phẩm..." />
        <FontAwesomeIcon className="icon-send-comment" icon={faPaperPlane} />
        <div className="user_comment">
          <p className="name">Guy Hawkins</p>
          <p className="content">Shop giao hàng siêu nhanh luôn, sản phẩm ok lắm nhe, sẽ tiếp tục ủng hộ shop nè ahihi!</p>
        </div>
        <div className="user_comment">
          <p className="name">Marvin McKinney</p>
          <p className="content">Giày đẹp, giao hàng nhanh</p>
        </div>
        <div className="user_comment">
          <p className="name">Brooklyn Simmons</p>
          <p className="content">5 sao cho shop nè ahihi</p>
        </div>
        <div className="user_comment">
          <p className="name">Brooklyn Simmons</p>
          <p className="content">Sẽ tiếp tục mua hàng ở shop vì, giao hàng nhanh nè, có kèm thư cảm ơn nữa.</p>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default ProductDetailsPage
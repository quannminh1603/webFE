// import { Badge, Button, Col, Popover } from 'antd'
// import React from 'react'
// import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
// import {
//   UserOutlined,
//   CaretDownOutlined,
//   ShoppingCartOutlined
// } from '@ant-design/icons';
// import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import * as UserService from '../../services/UserService'
// import { resetUser } from '../../redux/slides/userSlide'
// import { useState } from 'react';
// import Loading from '../LoadingComponent/Loading';
// import { useEffect } from 'react';
// import { searchProduct } from '../../redux/slides/productSlide';


// const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
//   const navigate = useNavigate()
//   const user = useSelector((state) => state.user)
//   const dispatch = useDispatch()
//   const [userName, setUserName] = useState('')
//   const [userAvatar, setUserAvatar] = useState('')
//   const [search,setSearch] = useState('')
//   const [isOpenPopup, setIsOpenPopup] = useState(false)
//   const order = useSelector((state) => state.order)
//   const [loading, setLoading] = useState(false)
//   const handleNavigateLogin = () => {
//     navigate('/sign-in')
//   }

//   const handleLogout = async () => {
//     setLoading(true)
//     await UserService.logoutUser()
//     dispatch(resetUser())
//     setLoading(false)
//   }

//   useEffect(() => {
//     setLoading(true)
//     setUserName(user?.name)
//     setUserAvatar(user?.avatar)
//     setLoading(false)
//   }, [user?.name, user?.avatar])

//   const content = (
//     <div>
//       <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
//       {user?.isAdmin && (

//         <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
//       )}
//       <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
//       <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
//     </div>
//   );

//   const handleClickNavigate = (type) => {
//     if(type === 'profile') {
//       navigate('/profile-user')
//     }else if(type === 'admin') {
//       navigate('/system/admin')
//     }else if(type === 'my-order') {
//       navigate('/my-order',{ state : {
//           id: user?.id,
//           token : user?.access_token
//         }
//       })
//     }else {
//       handleLogout()
//     }
//     setIsOpenPopup(false)
//   }

//   const onSearch = (e) => {
//     setSearch(e.target.value)
//     dispatch(searchProduct(e.target.value))
//   }

//   return (
//     <div style={{  heiht: '100%', width: '100%', display: 'flex',background: '#9255FD', justifyContent: 'center' }}>
//       <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
//         <Col span={5}>
//           <WrapperTextHeader to='/'>SHOP</WrapperTextHeader>
//         </Col>
//         {!isHiddenSearch && (
//           <Col span={13}>
//             <ButttonInputSearch
//               size="large"
//               bordered={false}
//               textbutton="Tìm kiếm"
//               placeholder="input search text"
//               onChange={onSearch}
//               backgroundColorButton="#5a20c1"
//             />
//           </Col>
//         )}
//         <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
//           <Loading isLoading={loading}>
//             <WrapperHeaderAccout>
//               {userAvatar ? (
//                 <img src={userAvatar} alt="avatar" style={{
//                   height: '30px',
//                   width: '30px',
//                   borderRadius: '50%',
//                   objectFit: 'cover'
//                 }} />
//               ) : (
//                 <UserOutlined style={{ fontSize: '30px' }} />
//               )}
//               {user?.access_token ? (
//                 <>
//                   <Popover content={content} trigger="click" open={isOpenPopup}>
//                     <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
//                   </Popover>
//                 </>
//               ) : (
//                 <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
//                   <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
//                   <div>
//                     <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
//                     <CaretDownOutlined />
//                   </div>
//                 </div>
//               )}
//             </WrapperHeaderAccout>
//           </Loading>
//           {!isHiddenCart && (
//             <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
//               <Badge count={order?.orderItems?.length} size="small">
//                 <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
//               </Badge>
//               <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
//             </div>
//           )}
//         </Col>
//       </WrapperHeader>
//     </div>
//   )
// }

// export default HeaderComponent

// test
import { Badge, Button, Col, Popover, Space } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import logo from "../../assets/images/logo1.png";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HeaderComponent.css";
// import logo from "../../assets/images/logo1.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { motion } from 'framer-motion';
import {
  faBars,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const contentUser = (
    <div className='infoUser'>
      <p onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</p>
      {user?.isAdmin && (

        <p onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</p>
      )}
      <p onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</p>
      <p onClick={() => handleClickNavigate()}>Đăng xuất</p>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  const contentSearch = (
    <div className="searchHeader">
      {/* <input className="searchInput" type="text" placeholder="Search" /> */}
      <ButttonInputSearch
        size="large"
        bordered={false}
        textbutton=""
        placeholder="Search"
        onChange={onSearch}
        backgroundColorButton="lightblue"
      />
    </div>

  )

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    } else if (type === 'admin') {
      navigate('/system/admin')
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }



  return (
    <>
      {/* <div style={{ marginTop: "120px", color: '#000', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader to='/'>
            <img src={logo} alt="" />
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
              backgroundColorButton="#5a20c1"
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={contentUser} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div> */}

      {/* test */}
      <div className="menu">
        <nav className="container">
          <div className="select_nav_left">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="select_nav_mid">
            <ul className="select_menu">
              <li className="listGiay">
                <a href="/contact">Giày</a>
                <div className="menuc2">
                  <div className="grid-3">
                    <div>
                      <ul>
                        <li><a style={{ fontWeight: "bold" }} href="/nikeproducts">Nike</a></li>
                        {/* <li><a href="#">Adidas</a></li>
                      <li><a href="#">MLB</a></li>
                      <li><a href="#">Asic</a></li>
                      <li><a href="#">Jordan</a></li>
                      <li><a href="#">Reebok</a></li> */}
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li><a style={{ fontWeight: "bold" }} href="/adidasproducts">Adidas</a></li>
                        {/* <li><a href="#">Nike</a></li>
                      <li><a href="#">MLB</a></li>
                      <li><a href="#">Asic</a></li>
                      <li><a href="#">Jordan</a></li>
                      <li><a href="#">Reebok</a></li> */}
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li><a style={{ fontWeight: "bold" }} href="/shoesproducts">Giày leo núi</a></li>
                        {/* <li><a href="#">Adidas</a></li>
                      <li><a href="#">MLB</a></li>
                      <li><a href="#">Asic</a></li>
                      <li><a href="#">Jordan</a></li>
                      <li><a href="#">Reebok</a></li> */}
                      </ul>
                    </div>
                    <div>
                      <img src={logo} alt="" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a href="/clothesproducts">Quần áo</a>
              </li>
              <li>
                <a href="/">Môn thể thao</a>
              </li>
              <li>
                <a href="/detail?id=1">Thương hiệu</a>
              </li>
              <li>
                <a style={{ color: "red", fontWeight: "bold" }} href="/detail">SALE</a>
              </li>
              <li>
                <a style={{ marginLeft: "200px" }} href="/about">Về chúng tôi</a>
              </li>
            </ul>
          </div>
          <div className="select_nav_right">
            {user?.access_token ? (
              <>
                <Popover content={contentUser} trigger="click" open={isOpenPopup}>
                  <div style={{ width: "100%", fontSize: "1.8rem", cursor: 'pointer', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                </Popover>
              </>
            ) : (
              // <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
              //   <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              //   <div>
              //     <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
              //     <CaretDownOutlined />
              //   </div>
              // </div>
              <a href="/login">
                <PersonOutlineOutlinedIcon className="icon" />
              </a>
            )}
            <div className="search">
              <Space wrap>
                <Popover content={contentSearch} trigger="click">
                  {/* <SearchIcon
              className='icon'
              style={{
                // position: "absolute",
                // top: "10px",
                // right: "10px",
                color: "#000",
              }}
            /> */}
                  {!isHiddenSearch && (
                    // <Col span={13}>
                    //   <ButttonInputSearch
                    //     size="large"
                    //     bordered={false}
                    //     textbutton="Tìm kiếm"
                    //     placeholder="input search text"
                    //     onChange={onSearch}
                    //     backgroundColorButton="#5a20c1"
                    //   />
                    // </Col>
                    <SearchIcon
                      className='icon'
                      style={{
                        // position: "absolute",
                        // top: "10px",
                        // right: "10px",
                        color: "#000",
                      }}
                    />
                  )}
                </Popover>
              </Space>

            </div>
            <a href="/cart">
              <ShoppingCartOutlinedIcon className="icon" />
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default HeaderComponent
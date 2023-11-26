// import AdminPage from "../pages/AdminPage/AdminPage";
// import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
// import HomePage from "../pages/HomePage/HomePage";
// import MyOrderPage from "../pages/MyOrder/MyOrder";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import OrderPage from "../pages/OrderPage/OrderPage";
// import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
// import PaymentPage from "../pages/PaymentPage/PaymentPage";
// import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
// import ProductsPage from "../pages/ProductsPage/ProductsPage";
// import ProfilePage from "../pages/Profile/ProfilePage";
// import SignInPage from "../pages/SignInPage/SignInPage";
// import SignUpPage from "../pages/SignUpPage/SignUpPage";
// import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

// export const routes = [
//     {
//         path: '/',
//         page: HomePage,
//         isShowHeader: true
//     },
//     {
//         path: '/order',
//         page: OrderPage,
//         isShowHeader: true
//     },
//     {
//         path: '/my-order',
//         page: MyOrderPage,
//         isShowHeader: true
//     },
//     {
//         path: '/details-order/:id',
//         page: DetailsOrderPage,
//         isShowHeader: true
//     },
//     {
//         path: '/payment',
//         page: PaymentPage,
//         isShowHeader: true
//     },
//     {
//         path: '/orderSuccess',
//         page: OrderSucess,
//         isShowHeader: true
//     },
//     {
//         path: '/products',
//         page: ProductsPage,
//         isShowHeader: true
//     },
//     {
//         path: '/product/:type',
//         page: TypeProductPage,
//         isShowHeader: true
//     },
//     {
//         path: '/sign-in',
//         page: SignInPage,
//         isShowHeader: false
//     },
//     {
//         path: '/sign-up',
//         page: SignUpPage,
//         isShowHeader: false
//     },
//     {
//         path: '/product-details/:id',
//         page: ProductDetailsPage,
//         isShowHeader: true
//     },
//     {
//         path: '/profile-user',
//         page: ProfilePage,
//         isShowHeader: true
//     },
//     {
//         path: '/system/admin',
//         page: AdminPage,
//         isShowHeader: false,
//         isPrivated: true
//     },
//     {
//         path: '*',
//         page: NotFoundPage
//     }
// ]

// test
import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import About from "../pages/About/About";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import NikeProducts from "../pages/NikeProducts/NikeProducts";
import AdidasProducts from "../pages/AdidasProducts/AdidasProducts";
import MlbProducts from "../pages/MlbProducts/MlbProducts";
import CategoryList from "../pages/AdminPage/Category/CategoryList";
import CategoryDetail from "../pages/AdminPage/Category/Detail/CategoryDetail";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/about',
        page: About,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/nikeproducts',
        page: NikeProducts,
        isShowHeader: true
    },
    {
        path: '/adidasproducts',
        page: AdidasProducts,
        isShowHeader: true
    },
    {
        path: '/mlb',
        page: MlbProducts,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '/system/admin/category',
        page: CategoryList,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '/system/admin/category/new',
        page: CategoryDetail,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '/system/admin/category/:id',
        page: CategoryDetail,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]
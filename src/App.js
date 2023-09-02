import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404error';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import { fetchLoggedinUsersAsync } from './features/user/userSlice';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './adminPages/AdminHome';
import AdminProductDetailPage from './adminPages/AdminProductDetailPage';
import AdminProductForm from './features/admin/components/AdminProductForm';
import AdminOrdersPage from './adminPages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <ProductDetailPage></ProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      // <Protected>
      <OrderSuccessPage></OrderSuccessPage>
      // </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);



function App() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedinUsersAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

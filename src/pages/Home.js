import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/productList'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList />
            {/* <LoginPage></LoginPage> */}
            {/* <SignupPage></SignupPage> */}
        </Navbar>
    </div>
  )
}

export default Home
import React from 'react'
import Products from "../products"
import {Row, Col} from "react-bootstrap"
import Product from '../components/Product'

function HomePage() {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
      {Products.map((product)=>(
        <Col key={product._id} sm={12} md={6} lg={4}>
          <Product product={product} />
        </Col>
      ))}


        
      </Row>
    </>
  )
}

export default HomePage
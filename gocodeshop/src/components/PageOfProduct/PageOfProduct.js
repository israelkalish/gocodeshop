import React, { useContext, useEffect, useState } from 'react'
import './PageOfProduct.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductFilter } from '../ProductFilter/ProductFilter';
import { useParams } from 'react-router-dom';
import MyDrawer from '../MyDrawer/MyDrawer';
import { GET_PRODUCT_BY_ID } from '../../constants/api';
import { MyContext } from '../../MyContext';

const PageOfProduct = () => {
  const { isadmin } = useContext(MyContext);
  const {_id} = useParams()
  const [singlProduct,setSinglProduct] = useState(null);

  const retrievingProduct = async () => {
    try {
      const response = await fetch(GET_PRODUCT_BY_ID+_id);
      const data = await response.json();
      setSinglProduct(data);
      console.log (singlProduct._id)
    } catch (err) {
      console.log(err);
    }
  };
  
  const [value, setValue] = useState('Add 🛒');
  useEffect(() => {
    if(isadmin) {
      console.log(isadmin)
      setValue('update')
    }
  }, [isadmin]);

  useEffect(() => {
    retrievingProduct();
  }, [_id]);

  return (
    <div className="App">
      <MyDrawer/>
      <ProductFilter />
      {singlProduct&&<ProductCard
      className="PageOfProduct"
      value={value}
      id={singlProduct._id}
      title={singlProduct.title}
      price={singlProduct.price}
      src={singlProduct.image}
      description={singlProduct.description}
      category={singlProduct.category}
      rating={singlProduct.rating}/>
      }
    </div>
  )
}
  
  export default PageOfProduct
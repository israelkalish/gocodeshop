
import './MyCart.css'
import {MyContext} from '../../MyContext'
import { useContext, useState } from 'react'
import { Button } from '../Button/Button';

export const MyCart = ({src,title,price,id,amount}) => {

    const {newMyCartObj} = useContext(MyContext);
    // setCountB (amount)
      return(
        
        <div className="myCart">
          <div className="myCart-src" >
            <img className="myCart-src" src={src}/>
          </div>
          <div className="">
            <h5>{title}</h5>
            <h6>${price}</h6>
            <h5>total ${price*amount}</h5>
          </div>
            <div>
              <div className="myCart-Button">
                <Button value='-' onClick={() =>newMyCartObj(id,(-1))}/>
                <p className="myCart-p">{amount}</p>
                <Button value='+' onClick={() =>newMyCartObj(id,1)}/>
              </div>
              <Button value='Cancel product' onClick={() =>newMyCartObj(id,(-amount))}/>
            </div>
          </div>
      )
  }
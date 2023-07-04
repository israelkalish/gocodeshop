import React, { Children, useContext } from "react";
import { Drawer } from '@mui/material';
import {MyContext} from '../../MyContext'
import { MyCart } from "../MyCart/MyCart";

const MyDrawer = () => {
    const {showCart,setShowCart,productsWithData,myCartArr,CartIndex} = useContext(MyContext);
  return (
    <>
      <Drawer
        anchor={`right`}
        open={showCart}
        onClose={()=>setShowCart(false)}
      >
        {
            !CartIndex[0]&&setShowCart(false)
        }
        {
          CartIndex.map((event) => {
            const obj =productsWithData.find((item) => item._id === event)
              return(<MyCart
                amount={myCartArr[obj._id]}
                src={obj.image}
                title={obj.title.slice(0, 15) + `...`}
                price={obj.price}
                id={obj._id}
              />)
            })
        
        }
      </Drawer>
    </>
  );
};

export default MyDrawer
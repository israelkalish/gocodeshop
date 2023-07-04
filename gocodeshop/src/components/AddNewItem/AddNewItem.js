import React, { useContext} from "react";
import './AddNewItem.css'
import { MyContext } from "../../MyContext";
import { Drawer } from '@mui/material';

const AddNewItem = () => {
    const { productData, handleInputChange, handleSubmit,addProduct,setAddProduct } = useContext(MyContext);


  return (
    <>
      <Drawer
        anchor={`top`}
        open={addProduct}
        onClose={()=>setAddProduct(false)}
      >
    <div className="drawer">
      <h1 onClick={()=>setAddProduct(false)}>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Price:
          <br/>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Adding</button>
      </form>
    </div>
      </Drawer>
    </>
  );
};

export default AddNewItem;

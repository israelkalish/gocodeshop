import { Button } from "../Button/Button";
import "./ProductCard.css";
import { MyContext } from "../../MyContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../../constants/api";

export const ProductCard = ({
  src,
  title,
  price,
  id,
  description,
  category,
  rating,
  className,
  app,
  value,
}) => {
  const {
    inputOnChange,
    myCartArr,
    setMyCartArr,
    isadmin,
    deleteFileFromShop,
    updateFile,
  } = useContext(MyContext);
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [editableImg, setEditableImg] = useState(src);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editablePrice, setEditablePrice] = useState(price);

  const newMyCartArr = (e) => {
    if (!count) {
      return;
    }
    const newObj = { ...myCartArr };
    newObj[e.target.id]
      ? (newObj[e.target.id] += count)
      : (newObj[e.target.id] = count);
    inputEl.current.value = null;
    setCount(0);
    setMyCartArr(newObj);
  };

  const handleClick = () => {
    navigate(`../products/${id}`);
  };
  
  const updateFileFromShop = () => {
    const nobj = {
      price: editablePrice,
      image: editableImg,
      description: editableDescription
    }
    updateFile(GET_PRODUCT_BY_ID+id, nobj)
  };

  return (
    <div className={className}>
      {app ? (
        <div className="product-image" onClick={handleClick}>
          <img src={src} />
        </div>
      ) : (
        <div className="product-image">
          <img src={src} />
        </div>
      )}
      <div>
        {rating ? (
          <div className="PageOfProduct-div">
            <h1>{title}</h1>
            <h5>{category}</h5>
            {isadmin ? (
              <>
              <h5>description:</h5>
                <textarea
                  type="text"
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                />
                <h5>price:</h5>
                <input
                  id='up'
                  type="number"
                  value={editablePrice}
                  onChange={(e) => setEditablePrice(e.target.value)}
                />
                <h5>image address:</h5>
                <input
                  type="text"
                  value={editableImg}
                  onChange={(e) => setEditableImg(e.target.value)}
                />
              </>
            ) :
            (<>
            <p>{description}</p>
            <h5>${price}</h5></>)}
            <div className="PageOfProduct-div-div">
              <p>rate:{rating["rate"]}</p>
              <p>count:{rating["count"]}</p>
            </div>
          </div>
        ) : (
          <div className="product-info">
            <h5>{title}</h5>
            <h6>${price}</h6>
          </div>
        )}
        <div className="buttons-amount">
          {!isadmin && (
            <input
              type="number"
              onChange={(e) => inputOnChange(e, setCount)}
              class="amount"
              ref={inputEl}
            />
          )}
        </div>
        <div className="buttons-amount">
          <Button
            value={value}
            className="bybutton"
            disabled={!isadmin && count === 0}
            id={id}
            onClick={
              value === "update"
                ? updateFileFromShop
                : isadmin
                ? deleteFileFromShop
                : newMyCartArr
            }
          />
          {/* <Button value='buy now' className='bybutton' onClick={(e)=>console.log(e.target.value)}/> */}
        </div>
      </div>
    </div>
  );
};
